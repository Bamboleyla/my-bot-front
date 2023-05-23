import configureStore, { MockStoreCreator } from "redux-mock-store";
import thunk, { ThunkDispatch } from "redux-thunk";
import { AxiosResponse } from "axios";
import { Api } from "../../shared/api";
import { logIn } from "./actions";
import { registrationFormSlice } from "../registration";
import { notification } from "antd";

type RootState = any;

const middlewares = [thunk];

type DispatchExts = ThunkDispatch<RootState, undefined, any>;

const mockStoreCreator: MockStoreCreator<RootState, DispatchExts> =
  configureStore(middlewares);

describe("logIn", () => {
  const email = "test@example.com";
  const password = "password";
  const error = new Error("Network error");
  const data = {
    value: "logIn",
  };

  const navigate = jest.fn();

  let store: RootState = mockStoreCreator();

  beforeEach(() => {
    jest.restoreAllMocks();
    store = mockStoreCreator();
  });

  it(`Если Api.auth.logIn({ email, password }) вернул status===200, должны произойти вызовы:
  1.registrationFormSlice.actions.addLoadingProcess({ value: "logIn", })
  2.registrationFormSlice.actions.reset(),
  3.navigate("/main"),
  4.registrationFormSlice.actions.deleteLoadingProcess({ value: "logIn", })`, async () => {
    jest
      .spyOn(Api.auth, "logIn")
      .mockResolvedValue({ status: 200 } as AxiosResponse<any>);

    await store.dispatch(logIn(email, password, navigate));

    const actions = store.getActions();

    expect(actions).toEqual([
      registrationFormSlice.actions.addLoadingProcess(data),
      registrationFormSlice.actions.reset(),
      registrationFormSlice.actions.deleteLoadingProcess(data),
    ]);
    expect(navigate).toHaveBeenCalledWith("/main");
  });

  it(`Если Api.auth.logIn({ email, password }) вернул status===400, должны произойти вызовы:
  1.registrationFormSlice.actions.addLoadingProcess({ value: "logIn", })
  2.notification.info({ message: "Ошибка авторизации", description: data.message, placement: "topLeft", }),
  3.registrationFormSlice.actions.deleteLoadingProcess({ value: "logIn", })`, async () => {
    const notificationSpy = jest.spyOn(notification, "info");

    jest.spyOn(Api.auth, "logIn").mockResolvedValue({
      status: 400,
      data: { message: "server error" },
    } as AxiosResponse<any>);

    await store.dispatch(logIn(email, password, navigate));

    const actions = store.getActions();

    expect(actions).toEqual([
      registrationFormSlice.actions.addLoadingProcess(data),
      registrationFormSlice.actions.deleteLoadingProcess(data),
    ]);
    expect(notificationSpy).toHaveBeenCalledWith({
      message: "Ошибка авторизации",
      description: "server error",
      placement: "topLeft",
    });
  });

  it(`Если Api.auth.logIn({ email, password }) вернул status===500, должны произойти вызовы:
  1.registrationFormSlice.actions.addLoadingProcess({ value: "logIn", })
  2.console.error(Для status неопределен сценарий),
  3.registrationFormSlice.actions.deleteLoadingProcess({ value: "logIn", })`, async () => {
    jest.spyOn(Api.auth, "logIn").mockResolvedValue({
      status: 500,
      data: { message: "server error" },
    } as AxiosResponse<any>);

    const consoleSpy = jest.spyOn(console, "error");

    await store.dispatch(logIn(email, password, navigate));

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
    jest.spyOn(Api.auth, "logIn").mockRejectedValueOnce(error);

    const consoleSpy = jest.spyOn(console, "error");

    await logIn(email, password, navigate)(jest.fn());

    expect(consoleSpy).toHaveBeenCalledWith(error);
  });
});
