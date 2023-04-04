import { API } from "./../base";
import MockAdapter from "axios-mock-adapter";
import { logIn } from "./auth";

const response = {
  message: "Логин или Пароль указан неверно",
  errors: [],
};

const data = {
  email: "chatbots@list.ru",
  password: "Test123",
};

describe("logIn", () => {
  let mock: MockAdapter;

  beforeAll(() => {
    mock = new MockAdapter(API);
  });

  afterEach(() => {
    mock.reset();
  });

  describe("Успешный запрос", () => {
    it("Должен вернуть статус 200", async () => {
      mock.onPost("http://localhost:5000/api/login").reply(200);

      const result = await logIn(data);

      expect(result.status).toBe(200);
      expect(result.config.url).toBe("/api/login");
      expect(result.config.baseURL).toBe("http://localhost:5000");
      expect(result.data).toBeUndefined();
      expect(result.config.data).toBe(
        '{"email":"chatbots@list.ru","password":"Test123"}'
      );
      expect(mock.history.post.length).toBe(1);
      expect(mock.history.post[0].method).toBe("post");
    });
  });

  describe("неправильный, некорректный запрос", () => {
    it("Должен вернуть статус 400", async () => {
      mock.onPost("http://localhost:5000/api/login").reply(400, response);

      const data = {
        email: "chatbots@gmail.com",
        password: "0000",
      };

      const result = await logIn(data);

      expect(result.status).toBe(400);
      expect(result.config.url).toBe("/api/login");
      expect(result.config.baseURL).toBe("http://localhost:5000");
      expect(result.data).toEqual(response);
      expect(result.config.data).not.toBe(
        '{"email":"chatbots@list.ru","password":"Test123"}'
      );
      expect(mock.history.post.length).toBe(1);
      expect(mock.history.post[0].method).toBe("post");
    });
  });
});
