import configureStore, { MockStoreCreator } from "redux-mock-store";
import thunk, { ThunkDispatch } from "redux-thunk";
import { AxiosResponse } from "axios";
import { Api } from "../../shared/api";
import { registrationFormSlice } from "../registration";
import { ChekEmailCode, IsValueAlreadyRegistered } from "./actions";

type RootState = any;

const middlewares = [thunk];

type DispatchExts = ThunkDispatch<RootState, undefined, any>;

const mockStoreCreator: MockStoreCreator<RootState, DispatchExts> =
  configureStore(middlewares);

let store: RootState = mockStoreCreator();
const error = new Error("Network error");

describe("IsValueAlreadyRegistered", () => {
  const data = {
    value: "IsThisEmailFree",
  };

  beforeEach(() => {
    jest.restoreAllMocks();
    store = mockStoreCreator();
  });

  it(`Если process === IsThisEmailFree, должны произойти вызовы:
  1.registrationFormSlice.actions.addLoadingProcess({ value: process })
  2.registrationFormSlice.actions.setEmail({ value, error: true, text: message })
  3.registrationFormSlice.actions.deleteLoadingProcess({ value: process })`, async () => {
    jest
      .spyOn(Api.registration, "isEmailAlreadyRegistered")
      .mockResolvedValue({ data: "Ok" } as AxiosResponse<any>);

    await store.dispatch(
      IsValueAlreadyRegistered("test@example.com", "IsThisEmailFree")
    );

    const actions = store.getActions();

    expect(actions).toEqual([
      registrationFormSlice.actions.addLoadingProcess(data),
      registrationFormSlice.actions.setEmail({
        value: "test@example.com",
        error: true,
        text: "Данный email уже зарегистрирован",
      }),
      registrationFormSlice.actions.deleteLoadingProcess(data),
    ]);
  });

  it(`Если process === isEmailRegistered, должны произойти вызовы:
  1.registrationFormSlice.actions.addLoadingProcess({ value: process })
  2.registrationFormSlice.actions.setEmail({ value, error: true, text: message })
  3.registrationFormSlice.actions.deleteLoadingProcess({ value: process })`, async () => {
    jest
      .spyOn(Api.registration, "isEmailAlreadyRegistered")
      .mockResolvedValue({ status: 200 } as AxiosResponse<any>);

    data.value = "isEmailRegistered";

    await store.dispatch(
      IsValueAlreadyRegistered("test@example.com", "isEmailRegistered")
    );

    const actions = store.getActions();

    expect(actions).toEqual([
      registrationFormSlice.actions.addLoadingProcess(data),
      registrationFormSlice.actions.setEmail({
        value: "test@example.com",
        error: true,
        text: "Данный email не зарегистрирован",
      }),
      registrationFormSlice.actions.deleteLoadingProcess(data),
    ]);
  });

  it(`Если process === isPhoneNumberAlreadyRegistered, должны произойти вызовы:
  1.registrationFormSlice.actions.addLoadingProcess({ value: process })
  2.registrationFormSlice.actions.setPhoneNumber({ value, error: true, text: message })
  3.registrationFormSlice.actions.deleteLoadingProcess({ value: process })`, async () => {
    jest
      .spyOn(Api.registration, "isPhoneNumberAlreadyRegistered")
      .mockResolvedValue({ data: "Ok" } as AxiosResponse<any>);

    data.value = "isPhoneNumberAlreadyRegistered";

    await store.dispatch(
      IsValueAlreadyRegistered(
        "+7 (123) 456 7890",
        "isPhoneNumberAlreadyRegistered"
      )
    );

    const actions = store.getActions();

    expect(actions).toEqual([
      registrationFormSlice.actions.addLoadingProcess(data),
      registrationFormSlice.actions.setPhoneNumber({
        value: "+7 (123) 456 7890",
        error: true,
        text: "Данный номер телефона уже зарегистрирован",
      }),
      registrationFormSlice.actions.deleteLoadingProcess(data),
    ]);
  });

  it(`Если process === isTokenTgAlreadyRegistered, должны произойти вызовы:
  1.registrationFormSlice.actions.addLoadingProcess({ value: process }),
  2.registrationFormSlice.actions.setTgToken({ value, error: true, text: message }),
  3.registrationFormSlice.actions.deleteLoadingProcess({ value: process })`, async () => {
    jest
      .spyOn(Api.registration, "isTgTokenAlreadyRegistered")
      .mockResolvedValue({ data: "Ok" } as AxiosResponse<any>);

    data.value = "isTokenTgAlreadyRegistered";

    await store.dispatch(
      IsValueAlreadyRegistered("token", "isTokenTgAlreadyRegistered")
    );

    const actions = store.getActions();

    expect(actions).toEqual([
      registrationFormSlice.actions.addLoadingProcess(data),
      registrationFormSlice.actions.setTgToken({
        value: "token",
        error: true,
        text: "Данный telegram token уже зарегистрирован",
      }),
      registrationFormSlice.actions.deleteLoadingProcess(data),
    ]);
  });
  it(`Если process === Any, должны произойти вызовы:
  1.registrationFormSlice.actions.addLoadingProcess({ value: process }),
  2.console.error(Для process: Any сценарий неопределен),
  3.registrationFormSlice.actions.deleteLoadingProcess({ value: process })`, async () => {
    const consoleSpy = jest.spyOn(console, "error");

    data.value = "Any";

    await store.dispatch(IsValueAlreadyRegistered("Test", "Any"));

    const actions = store.getActions();

    expect(actions).toEqual([
      registrationFormSlice.actions.addLoadingProcess(data),
      registrationFormSlice.actions.deleteLoadingProcess(data),
    ]);
    expect(consoleSpy).toBeCalledWith("Для process: Any сценарий неопределен");
  });

  test("catch (error)", async () => {
    jest
      .spyOn(Api.registration, "isTgTokenAlreadyRegistered")
      .mockRejectedValueOnce(error);

    const consoleSpy = jest.spyOn(console, "error");

    await IsValueAlreadyRegistered(
      "token",
      "isTokenTgAlreadyRegistered"
    )(jest.fn());

    expect(consoleSpy).toHaveBeenCalledWith(error);
  });
});

describe("ChekEmailCode", () => {
  const data = {
    value: "ChekEmailCode",
  };
  const navigate = jest.fn();

  beforeEach(() => {
    jest.restoreAllMocks();
    store = mockStoreCreator();
  });

  it(`Если в ответе на Api.registration.chekEmailCode({ email, code, navigate }) нет свойства success, должны произойти вызовы:
  1.registrationFormSlice.actions.addLoadingProcess({ value: "ChekEmailCode" })
  2.registrationFormSlice.actions.setEmailCode({ value: code, error: true, text: data.message })
  3.registrationFormSlice.actions.deleteLoadingProcess({ value: "ChekEmailCode" })`, async () => {
    jest.spyOn(Api.registration, "chekEmailCode").mockResolvedValue({
      data: { message: "Code invalid" },
    } as AxiosResponse<any>);

    await store.dispatch(ChekEmailCode("test@example.com", "0123", navigate));

    const actions = store.getActions();

    expect(actions).toEqual([
      registrationFormSlice.actions.addLoadingProcess(data),
      registrationFormSlice.actions.setEmailCode({
        value: "0123",
        error: true,
        text: "Code invalid",
      }),
      registrationFormSlice.actions.deleteLoadingProcess(data),
    ]);
  });

  it(`Если в ответе на Api.registration.chekEmailCode({ email, code, navigate }) есть свойство success, должны произойти вызовы:
  1.registrationFormSlice.actions.addLoadingProcess({ value: "ChekEmailCode" }),
  2.registrationFormSlice.actions.reset(),
  3.navigate("/main"),
  3.registrationFormSlice.actions.deleteLoadingProcess({ value: "ChekEmailCode" })`, async () => {
    jest.spyOn(Api.registration, "chekEmailCode").mockResolvedValue({
      data: { success: true },
    } as AxiosResponse<any>);

    await store.dispatch(ChekEmailCode("test@example.com", "0123", navigate));

    const actions = store.getActions();

    expect(actions).toEqual([
      registrationFormSlice.actions.addLoadingProcess(data),
      registrationFormSlice.actions.reset(),
      registrationFormSlice.actions.deleteLoadingProcess(data),
    ]);
    expect(navigate).toBeCalledWith("/main");
  });

  test("catch (error)", async () => {
    jest.spyOn(Api.registration, "chekEmailCode").mockRejectedValueOnce(error);

    const consoleSpy = jest.spyOn(console, "error");

    await ChekEmailCode("test@example.com", "0123", navigate)(jest.fn());

    expect(consoleSpy).toHaveBeenCalledWith(error);
  });
});
