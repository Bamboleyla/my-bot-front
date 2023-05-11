import * as router from "react-router";
import * as ReactRedux from "../../app/redux";
import * as logInModule from "../../entities/auth/actions";
import { getEmailAccordingToTheTemplate } from "../../pages/Registration/utils";
import { renderHook } from "@testing-library/react";
import { Provider } from "react-redux";
import { AppStore, setupStore } from "../../entities/store";
import { useAuth } from ".";
import { registrationFormSlice } from "../../entities/registration";

describe("useAuth", () => {
  const setup = (store: AppStore): ReturnType<typeof useAuth> => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    return result.current;
  };

  const { setEmail, setPassword, reset } = registrationFormSlice.actions;

  const navigate = jest.fn();
  const useDispatchMock = jest.fn();

  describe("sendDate", () => {
    const logInMock = jest.fn();

    beforeEach(() => {
      jest.clearAllMocks();
    });
    it("Поле login пустое, в registrationForm.data.email должны быть свойства error: true, errorText: 'Поле не может быть пустым'", () => {
      const store: AppStore = setupStore();

      jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
      jest.spyOn(ReactRedux, "useAppDispatch").mockReturnValue(useDispatchMock);

      const { sendDate } = setup(store);
      sendDate();

      store.subscribe(() =>
        expect(store.getState().registrationForm.data.email).toEqual({
          value: "",
          error: true,
          errorText: "Поле не может быть пустым",
        })
      );

      expect(useDispatchMock).toBeCalled();
    });

    it("Заполним значение Login данными, в registrationForm.data.password должны быть свойства error: true, errorText: 'Поле не может быть пустым'", () => {
      const store: AppStore = setupStore();

      store.dispatch(
        setEmail({
          value: "example@gmail.com",
          error: false,
          text: "",
        })
      );

      jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
      jest.spyOn(ReactRedux, "useAppDispatch").mockReturnValue(useDispatchMock);

      const { sendDate } = setup(store);
      sendDate();

      store.subscribe(() =>
        expect(store.getState().registrationForm.data.password).toEqual({
          value: "",
          error: true,
          errorText: "Поле не может быть пустым",
        })
      );
    });

    it("Заполним значение Login и Password данными, должен выполнится запрос logIn", () => {
      const store: AppStore = setupStore();
      store.dispatch(
        setPassword({
          value: "Test",
          error: false,
          text: "",
        })
      );
      store.dispatch(
        setEmail({
          value: "example@gmail.com",
          error: false,
          text: "",
        })
      );

      jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
      jest.spyOn(ReactRedux, "useAppDispatch").mockReturnValue(store.dispatch);
      jest.spyOn(logInModule, "logIn").mockReturnValue(logInMock);

      const { sendDate } = setup(store);
      sendDate();

      expect(logInMock).toBeCalled();
    });
  });

  describe("setEmailValue", () => {
    it("должен происходить dispatch setEmail с результатом вызова getEmailAccordingToTheTemplate", () => {
      const store: AppStore = setupStore();

      jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
      jest.spyOn(ReactRedux, "useAppDispatch").mockReturnValue(useDispatchMock);

      const { setEmailValue } = setup(store);
      const value = "test@mail.com";

      setEmailValue(value);

      expect(useDispatchMock).toHaveBeenCalledWith(
        setEmail(getEmailAccordingToTheTemplate(value))
      );
    });
  });

  describe("config", () => {
    const store: AppStore = setupStore();

    jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
    jest.spyOn(ReactRedux, "useAppDispatch").mockReturnValue(useDispatchMock);

    const { config } = setup(store);
    const value = { error: false, errorText: "", value: "" };
    it('config должен иметь fieldData:{ error: false, errorText: "", value: "" }, label:"Пароль"', () => {
      expect(config.fieldData).toEqual(value);
      expect(config.label).toBe("Пароль");
    });
    it("config.setValue должен производить изменения в store", () => {
      config.setValue("TestPassword");
      store.subscribe(() =>
        expect(store.getState().registrationForm.data.password).toEqual({
          value: "TestPassword",
          error: false,
          errorText: "",
        })
      );
    });
  });

  describe("goToForgetPassword", () => {
    const store: AppStore = setupStore();

    jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);
    jest.spyOn(ReactRedux, "useAppDispatch").mockReturnValue(useDispatchMock);

    const { goToForgetPassword } = setup(store);
    it("должен происходить вызов useDispatchMock и navigate с определенными параметрами", () => {
      goToForgetPassword();
      // useDispatchMock должен вызываться с reset()
      expect(useDispatchMock).toBeCalledWith(reset());
      // navigate должен вызываться с "/forgetPassword"
      expect(navigate).toBeCalledWith("/forgetPassword");
    });
  });
});
