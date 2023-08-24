import configureStore, { MockStoreCreator } from "redux-mock-store";
import thunk, { ThunkDispatch } from "redux-thunk";
import { AxiosResponse } from "axios";
import { Api } from "../../shared/api";
import { changePassword, sendСodeToEmail } from "./actions";
import { registrationFormSlice } from "../registration";
import { notification } from "antd";

type RootState = any;

const middlewares = [thunk];

type DispatchExts = ThunkDispatch<RootState, undefined, any>;

const mockStoreCreator: MockStoreCreator<RootState, DispatchExts> =
  configureStore(middlewares);

describe("sendСodeToEmail", () => {
  const email = { email: "test@example.com" };
  const message = "Новое Письмо!";
  const description = `Вам на ваш почтовый ящик ${email.email} выслано письмо с кодом активации акаунта`;
  const data = {
    value: "sendСodeToEmail",
  };

  let store: RootState = mockStoreCreator();

  beforeEach(() => {
    jest.restoreAllMocks();
    store = mockStoreCreator();
  });

  it(`Если Api.forgetPassword.sendСodeToEmail(email) вернул status===200, должны произойти вызовы:
  1.registrationFormSlice.actions.addLoadingProcess({ value: "sendСodeToEmail", })
  2.notification.info({ message, description, placement: "topLeft" })
  3.registrationFormSlice.actions.deleteLoadingProcess({ value: "sendСodeToEmail", })`, async () => {
    jest
      .spyOn(Api.forgetPassword, "sendСodeToEmail")
      .mockResolvedValue({ status: 200 } as AxiosResponse<any>);

    const notificationSpy = jest.spyOn(notification, "info");

    await store.dispatch(sendСodeToEmail(email));

    const actions = store.getActions();

    expect(actions).toEqual([
      registrationFormSlice.actions.addLoadingProcess(data),
      registrationFormSlice.actions.deleteLoadingProcess(data),
    ]);
    expect(notificationSpy).toHaveBeenCalledWith({
      message,
      description,
      placement: "topLeft",
    });
  });

  it(`Если Api.forgetPassword.sendСodeToEmail(email) вернул status===400, должны произойти вызовы:
  1.registrationFormSlice.actions.addLoadingProcess({ value: "sendСodeToEmail", })
  2.console.error(Для status неопределен сценарий),
  3.registrationFormSlice.actions.deleteLoadingProcess({ value: "sendСodeToEmail", })`, async () => {
    jest
      .spyOn(Api.forgetPassword, "sendСodeToEmail")
      .mockResolvedValue({ status: 400 } as AxiosResponse<any>);

    const consoleSpy = jest.spyOn(console, "error");

    await store.dispatch(sendСodeToEmail(email));

    const actions = store.getActions();

    expect(actions).toEqual([
      registrationFormSlice.actions.addLoadingProcess(data),
      registrationFormSlice.actions.deleteLoadingProcess(data),
    ]);
    expect(consoleSpy).toHaveBeenCalledWith(
      `Для status: 400 неопределен сценарий`
    );
  });

  test("catch (error)", async () => {
    const error = new Error("Network error");

    jest
      .spyOn(Api.forgetPassword, "sendСodeToEmail")
      .mockRejectedValueOnce(error);

    const consoleSpy = jest.spyOn(console, "error");

    await sendСodeToEmail(email)(jest.fn());

    expect(consoleSpy).toHaveBeenCalledWith(error);
  });
});

describe("changePassword", () => {
  const params = {
    email: "test@example.com",
    code: "1234",
    password: "Password123",
  };

  const data = {
    value: "changePassword",
  };

  const navigate = jest.fn();

  let store: RootState = mockStoreCreator();

  beforeEach(() => {
    jest.restoreAllMocks();
    store = mockStoreCreator();
  });

  it(`Если Api.forgetPassword.changePassword(data) вернул status===200, должны произойти вызовы:
  1.registrationFormSlice.actions.addLoadingProcess({ value: "changePassword", })
  2.notification.info({ message, description, placement: "topLeft" })
  3.navigate("/main");
  4.registrationFormSlice.actions.deleteLoadingProcess({ value: "changePassword", })`, async () => {
    jest
      .spyOn(Api.forgetPassword, "changePassword")
      .mockResolvedValue({ status: 200 } as AxiosResponse<any>);

    const notificationSpy = jest.spyOn(notification, "info");
    let message = "Действие выполнено!";
    let description = `Пароль от  ${params.email} был успешно изменен`;

    await store.dispatch(changePassword(params, navigate));

    const actions = store.getActions();

    expect(actions).toEqual([
      registrationFormSlice.actions.addLoadingProcess(data),
      registrationFormSlice.actions.reset(),
      registrationFormSlice.actions.deleteLoadingProcess(data),
    ]);
    expect(notificationSpy).toHaveBeenCalledWith({
      message,
      description,
      placement: "topLeft",
    });
    expect(navigate).toBeCalledWith("/main");
  });

  it(`Если Api.forgetPassword.changePassword(data) вернул status===400, должны произойти вызовы:
  1.registrationFormSlice.actions.addLoadingProcess({ value: "changePassword", })
  2.registrationFormSlice.actions.setEmailCode({ value: data.code, error: true, text: "Неверный код"})
  3.registrationFormSlice.actions.deleteLoadingProcess({ value: "changePassword", })`, async () => {
    jest
      .spyOn(Api.forgetPassword, "changePassword")
      .mockResolvedValue({ status: 400 } as AxiosResponse<any>);

    await store.dispatch(changePassword(params, navigate));

    const actions = store.getActions();

    expect(actions).toEqual([
      registrationFormSlice.actions.addLoadingProcess(data),
      registrationFormSlice.actions.setEmailCode({
        value: params.code,
        error: true,
        text: "Неверный код",
      }),
      registrationFormSlice.actions.deleteLoadingProcess(data),
    ]);
  });

  it(`Если Api.forgetPassword.changePassword(data) вернул status===500, должны произойти вызовы:
  1.registrationFormSlice.actions.addLoadingProcess({ value: "changePassword", }),
  2.console.error(Для status неопределен сценарий),
  3.registrationFormSlice.actions.deleteLoadingProcess({ value: "changePassword", })`, async () => {
    jest
      .spyOn(Api.forgetPassword, "changePassword")
      .mockResolvedValue({ status: 500 } as AxiosResponse<any>);

    const consoleSpy = jest.spyOn(console, "error");

    await store.dispatch(changePassword(params, navigate));

    const actions = store.getActions();

    expect(actions).toEqual([
      registrationFormSlice.actions.addLoadingProcess(data),
      registrationFormSlice.actions.deleteLoadingProcess(data),
    ]);
    expect(consoleSpy).toHaveBeenCalledWith(
      `Для status: 500 неопределен сценарий`
    );
  });

  test("catch (error)", async () => {
    const error = new Error("Network error");

    jest
      .spyOn(Api.forgetPassword, "changePassword")
      .mockRejectedValueOnce(error);

    const consoleSpy = jest.spyOn(console, "error");

    await changePassword(params, navigate)(jest.fn());

    expect(consoleSpy).toHaveBeenCalledWith(error);
  });
});
