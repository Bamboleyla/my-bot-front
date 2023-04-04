import { API } from "./../base";
import MockAdapter from "axios-mock-adapter";
import { logIn } from "./auth";

describe("logIn", () => {
  let mock: MockAdapter;

  beforeAll(() => {
    mock = new MockAdapter(API);
  });

  afterEach(() => {
    mock.reset();
  });

  const data = {
    email: "test@gmail.com",
    password: "Test123",
  };

  describe("Правильный запрос", () => {
    it("Должен вернуть статус 200", async () => {
      mock.onPost("http://localhost:5000/api/login").reply(200);

      const result = await logIn(data);

      expect(result.status).toBe(200);
      expect(result.config.url).toBe("/api/login");
      expect(result.config.baseURL).toBe("http://localhost:5000");
      expect(mock.history.post.length).toBe(1);
      expect(mock.history.post[0].method).toBe("post");
    });
  });

  describe("НЕ правильный запрос", () => {
    it("Должен вернуть статус 400", async () => {
      const res = {
        message: "Логин или Пароль указан неверно",
        errors: [],
      };

      mock.onPost("http://localhost:5000/api/login").reply(400, res);

      const result = await logIn(data);

      expect(result.data).toEqual(res);
      expect(result.status).toBe(400);
      expect(result.config.url).toBe("/api/login");
      expect(result.config.baseURL).toBe("http://localhost:5000");
      expect(mock.history.post.length).toBe(1);
      expect(mock.history.post[0].method).toBe("post");
    });
  });
});
