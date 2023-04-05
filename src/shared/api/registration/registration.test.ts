import MockAdapter from "axios-mock-adapter";
import { API } from "../base";
import {
  isEmailAlreadyRegistered,
  isPhoneNumberAlreadyRegistered,
  isTgTokenAlreadyRegistered,
  registerNewUser,
  chekEmailCode,
} from "./registration";

describe("registration", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(API);
  });

  afterEach(() => {
    mock.reset();
  });

  describe("isEmailAlreadyRegistered", () => {
    const email = "chatbots@list.ru";

    it("должен вернуть статус 200 и ожидаемый результат, если электронная почта уже зарегистрирована", async () => {
      mock
        .onPost("http://localhost:5000/api/checkEmail", { email })
        .reply(200, true);

      const result = await isEmailAlreadyRegistered({ email });

      expect(result.status).toBe(200);
      expect(result.config.url).toBe("/api/checkEmail");
      expect(result.config.baseURL).toBe("http://localhost:5000");
      expect(result.data).toBeTruthy();
      expect(
        result.config.data.includes('{"email":"chatbots@list.ru"}')
      ).toBeTruthy();
      expect(mock.history.post.length).toBe(1);
      expect(mock.history.post[0].method).toBe("post");
    });

    it("должен вернуться статус 200 и ожидаемый результат, если электронная почта не зарегистрирована", async () => {
      const email = "test@list.ru";

      mock
        .onPost("http://localhost:5000/api/checkEmail", { email })
        .reply(200, false);
      const result = await isEmailAlreadyRegistered({ email });

      expect(result.status).toBe(200);
      expect(result.config.url).toBe("/api/checkEmail");
      expect(result.config.baseURL).toBe("http://localhost:5000");
      expect(result.data).toBeFalsy();
      expect(
        result.config.data.includes('{ email: "chatbots@list.ru" }')
      ).toBeFalsy();
      expect(mock.history.post.length).toBe(1);
      expect(mock.history.post[0].method).toBe("post");
    });
  });

  describe("isPhoneNumberAlreadyRegistered", () => {
    const phone = "+7(999)9999999";

    it("должен вернуть статус 200 и ожидаемый результат, если телефонный номер уже зарегистрирована", async () => {
      mock
        .onPost("http://localhost:5000/api/checkPhone", { phone })
        .reply(200, true);

      const result = await isPhoneNumberAlreadyRegistered({ phone });

      expect(result.status).toBe(200);
      expect(result.config.url).toBe("/api/checkPhone");
      expect(result.config.baseURL).toBe("http://localhost:5000");
      expect(result.data).toBeTruthy();
      expect(result.config.data).toBe(JSON.stringify({ phone }));
      expect(mock.history.post.length).toBe(1);
      expect(mock.history.post[0].method).toBe("post");
    });

    it("должен вернуться статус 200 и ожидаемый результат, если телефонный номер не зарегистрирована", async () => {
      const phone = "+7(000)0000001";

      mock
        .onPost("http://localhost:5000/api/checkPhone", { phone })
        .reply(200, false);

      const result = await isPhoneNumberAlreadyRegistered({ phone });

      expect(result.status).toBe(200);
      expect(result.config.url).toBe("/api/checkPhone");
      expect(result.config.baseURL).toBe("http://localhost:5000");
      expect(result.data).toBeFalsy();
      expect(
        result.config.data.includes('{"phone":"+7(999)9999999"}')
      ).toBeFalsy();
      expect(mock.history.post.length).toBe(1);
      expect(mock.history.post[0].method).toBe("post");
    });
  });

  describe("isTgTokenAlreadyRegistered", () => {
    const token = "5531530989:AAEXa8wwQUIW96_I2xn-iSeyqfon8OXHzpM ";

    it("должен вернуть статус 200 и ожидаемый результат, если токен уже зарегистрирован", async () => {
      mock
        .onPost("http://localhost:5000/api/checkTokenTG", { token })
        .reply(200, true);

      const result = await isTgTokenAlreadyRegistered({ token });

      expect(result.status).toBe(200);
      expect(result.config.url).toBe("/api/checkTokenTG");
      expect(result.config.baseURL).toBe("http://localhost:5000");
      expect(result.data).toBeTruthy();
      expect(result.config.data).toBe(JSON.stringify({ token }));
      expect(mock.history.post.length).toBe(1);
      expect(mock.history.post[0].method).toBe("post");
    });

    it("должен вернуться статус 200 и ожидаемый результат, если токен не зарегистрирован", async () => {
      const token = "5531534489:AAEXa8wwQUIW96_ссxn-iSeyqfon8OjkzpM ";

      mock
        .onPost("http://localhost:5000/api/checkTokenTG", { token })
        .reply(200, false);

      const result = await isTgTokenAlreadyRegistered({ token });

      expect(result.status).toBe(200);
      expect(result.config.url).toBe("/api/checkTokenTG");
      expect(result.config.baseURL).toBe("http://localhost:5000");
      expect(result.data).toBeFalsy();
      expect(
        result.config.data.includes(
          '{"token":"5531530989:AAEXa8wwQUIW96_I2xn-iSeyqfon8OXHzpM "}'
        )
      ).toBeFalsy();
      expect(mock.history.post.length).toBe(1);
      expect(mock.history.post[0].method).toBe("post");
    });
  });

  describe("registerNewUser", () => {
    const data = {
      firstName: "Виталий",
      lastName: "Голованов",
      middleName: "Олегович",
      phoneNumber: "+29553334411",
      email: "dvorobjevredstar@mail.ru",
      country: "Танзания",
      city: "Занзибар",
      tgToken: "5531500989:AAyXa8wwQUIW96_42xn-iS7yqfon8OXHz11",
      password: "0000",
    };

    it("должен вернуть статус 200 и ожидаемый результат, если регистрация прошла успешно", async () => {
      mock
        .onPost("http://localhost:5000/api/registration", data)
        .reply(200, true);

      const result = await registerNewUser(data);

      expect(result.status).toBe(200);
      expect(result.config.url).toBe("/api/registration");
      expect(result.config.baseURL).toBe("http://localhost:5000");
      expect(result.data).toBeTruthy();
      expect(result.config.data).toBe(JSON.stringify(data));
      expect(mock.history.post.length).toBe(1);
      expect(mock.history.post[0].method).toBe("post");
    });

    it("должен вернуться статус 200 и ожидаемый результат, если пользователь уже зарегестрирован", async () => {
      const newData = {
        firstName: "Иванов",
        lastName: "Иван",
        middleName: "Иванович",
        phoneNumber: "+71111111111",
        email: "chatbots@list.ru",
        country: "Россия",
        city: "Москва",
        tgToken: "test",
        password: "0000",
      };

      mock
        .onPost("http://localhost:5000/api/registration", newData)
        .reply(200, false);

      const result = await registerNewUser(newData);

      expect(result.status).toBe(200);
      expect(result.config.url).toBe("/api/registration");
      expect(result.config.baseURL).toBe("http://localhost:5000");
      expect(result.data).toBeFalsy();
      expect(result.config.data).not.toBe(JSON.stringify(data));
      expect(mock.history.post.length).toBe(1);
      expect(mock.history.post[0].method).toBe("post");
    });
  });

  describe("chekEmailCode", () => {
    const config = { email: "chatbots@list.ru", code: "1111" };

    it("должен вернуть статус 200 и ожидаемый результат, если токен уже зарегистрирован", async () => {
      mock
        .onPost("http://localhost:5000/api/emailCode", config)
        .reply(200, true);

      const result = await chekEmailCode(config);

      expect(result.status).toBe(200);
      expect(result.config.url).toBe("/api/emailCode");
      expect(result.config.baseURL).toBe("http://localhost:5000");
      expect(result.data).toBeTruthy();
      expect(result.config.data.includes('","code":"1111"}')).toBeTruthy();
      expect(mock.history.post.length).toBe(1);
      expect(mock.history.post[0].method).toBe("post");
    });

    it("должен вернуться статус 200 и ожидаемый результат, если токен не зарегистрирован", async () => {
      const config = { email: "chatbots@list.ru", code: "0000" };

      mock
        .onPost("http://localhost:5000/api/emailCode", config)
        .reply(200, false);

      const result = await chekEmailCode(config);

      expect(result.status).toBe(200);
      expect(result.config.url).toBe("/api/emailCode");
      expect(result.config.baseURL).toBe("http://localhost:5000");
      expect(result.data).toBeFalsy();
      expect(result.config.data.includes('","code":"1111"}')).toBeFalsy();
      expect(mock.history.post.length).toBe(1);
      expect(mock.history.post[0].method).toBe("post");
    });
  });
});
