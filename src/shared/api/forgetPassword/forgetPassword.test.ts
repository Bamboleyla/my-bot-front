import { API } from "./../base";
import MockAdapter from "axios-mock-adapter";
import { sendСodeToEmail, changePassword } from "./forgetPassword";

describe("forgetPassword", () => {
  const data = {
    email: "chatbots@list.ru",
  };

  const response = {
    message: "Не удалось найти учетную запись",
    errors: [],
  };

  let mock: MockAdapter;

  beforeAll(() => {
    mock = new MockAdapter(API);
  });

  afterEach(() => {
    mock.reset();
  });

  describe("sendСodeToEmail", () => {
    describe("Успешный запрос", () => {
      it("Должен вернуть статус 200", async () => {
        mock.onPost("http://localhost:5000/api/sendCodeToEmail").reply(200);

        const result = await sendСodeToEmail(data);

        expect(result.status).toBe(200);
        expect(result.config.url).toBe("/api/sendCodeToEmail");
        expect(result.config.baseURL).toBe("http://localhost:5000");
        expect(result.data).toBeUndefined();
        expect(result.config.data).toBe('{"email":"chatbots@list.ru"}');
        expect(mock.history.post.length).toBe(1);
        expect(mock.history.post[0].method).toBe("post");
      });
    });

    describe("неправильный, некорректный запрос", () => {
      const data = {
        email: "test@list.ru",
      };

      it("Должен вернуть статус 400", async () => {
        mock
          .onPost("http://localhost:5000/api/sendCodeToEmail")
          .reply(400, response);

        const result = await sendСodeToEmail(data);

        expect(result.status).toBe(400);
        expect(result.config.url).toBe("/api/sendCodeToEmail");
        expect(result.config.baseURL).toBe("http://localhost:5000");
        expect(result.data).toEqual(response);
        expect(result.config.data).not.toBe('{"email":"chatbots@list.ru"}');
        expect(mock.history.post.length).toBe(1);
        expect(mock.history.post[0].method).toBe("post");
      });
    });
  });

  describe("changePassword", () => {
    const data = {
      email: "chatbots@list.ru",
      code: "5990",
      password: "Test123",
    };

    let res = { ...response, message: "Неверный код" };

    describe("Успешный запрос", () => {
      it("Должен вернуть статус 200", async () => {
        mock.onPost("http://localhost:5000/api/changePassword").reply(200);

        const result = await changePassword(data);

        expect(result.status).toBe(200);
        expect(result.config.url).toBe("/api/changePassword");
        expect(result.config.baseURL).toBe("http://localhost:5000");
        expect(result.data).toBeUndefined();
        expect(
          result.config.data.includes(
            '{"email":"chatbots@list.ru","code":"5990","password":"'
          )
        ).toBeTruthy();
        expect(mock.history.post.length).toBe(1);
        expect(mock.history.post[0].method).toBe("post");
      });
    });

    describe("неправильный, некорректный запрос", () => {
      const data = {
        email: "chatbots@list.ru",
        code: "0000",
        password: "Test123",
      };
      it("Должен вернуть статус 400", async () => {
        mock.onPost("http://localhost:5000/api/changePassword").reply(400, res);

        const result = await changePassword(data);

        expect(result.status).toBe(400);
        expect(result.config.url).toBe("/api/changePassword");
        expect(result.config.baseURL).toBe("http://localhost:5000");
        expect(result.data).toEqual(res);
        expect(
          result.config.data.includes(
            '{"email":"chatbots@list.ru","code":"5990","password":"'
          )
        ).toBeFalsy();
        expect(mock.history.post.length).toBe(1);
        expect(mock.history.post[0].method).toBe("post");
      });
    });
  });
});
