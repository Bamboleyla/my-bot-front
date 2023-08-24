import { API } from "../base";
import MockAdapter from "axios-mock-adapter";
import { logIn } from "./auth";

const RESPONSE_BODY = {
  message: "Логин или Пароль указан неверно",
  errors: [],
};

const DATA = {
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
      mock.onPost("/api/login").reply(200);

      const result = await logIn(DATA);

      expect(result.status).toBe(200);
      expect(result.config.url).toBe("/api/login");
      expect(result.config.baseURL).toBe(API.defaults.baseURL);
      expect(result.data).toBeUndefined();
      expect(result.config.data).toBe(JSON.stringify(DATA));
      expect(mock.history.post.length).toBe(1);
      expect(mock.history.post[0].method).toBe("post");
    });
  });

  describe("Неправильный запрос", () => {
    it("Должен вернуть статус 400", async () => {
      mock.onPost("/api/login").reply(400, RESPONSE_BODY);

      const data = {
        email: "chatbots@gmail.com",
        password: "0000",
      };

      const result = await logIn(data);

      expect(result.status).toBe(400);
      expect(result.config.url).toBe("/api/login");
      expect(result.config.baseURL).toBe(API.defaults.baseURL);
      expect(result.data).toEqual(RESPONSE_BODY);
      expect(result.config.data).not.toBe(JSON.stringify(DATA));
      expect(mock.history.post.length).toBe(1);
      expect(mock.history.post[0].method).toBe("post");
    });
  });
});
