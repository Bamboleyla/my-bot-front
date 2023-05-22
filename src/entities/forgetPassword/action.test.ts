import configureStore, { MockStoreCreator } from "redux-mock-store";
import thunk, { ThunkDispatch } from "redux-thunk";
import { AxiosResponse } from "axios";
import { Api } from "../../shared/api";
import { sendСodeToEmail } from "./actions";
import { registrationFormSlice } from "../registration";
import { notification } from "antd";

type RootState = any;

const middlewares = [thunk];

type DispatchExts = ThunkDispatch<RootState, undefined, any>;

const mockStoreCreator: MockStoreCreator<RootState, DispatchExts> =
  configureStore(middlewares);

describe("sendСodeToEmail", () => {
  const email = { email: "test@example.com" };

  const data = {
    value: "sendСodeToEmail",
  };

  let store: RootState = mockStoreCreator();

  beforeEach(() => {
    jest.restoreAllMocks();
    store = mockStoreCreator();
  });

  it(`Если Api.forgetPassword.sendСodeToEmail(email) вернул status===200, должны произойти вызовы:
  1.registrationFormSlice.actions.addLoadingProcess({ value: "logIn", })
  2.notification.info({ message, description, placement: "topLeft" })
  3.registrationFormSlice.actions.deleteLoadingProcess({ value: "logIn", })`, async () => {
    jest
      .spyOn(Api.forgetPassword, "sendСodeToEmail")
      .mockResolvedValue({ status: 200 } as AxiosResponse<any>);

    const notificationSpy = jest.spyOn(notification, "info");
    let message = "Новое Письмо!";
    let description = `Вам на ваш почтовый ящик ${email.email} выслано письмо с кодом активации акаунта`;

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
