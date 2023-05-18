import { renderHook } from "@testing-library/react";
import { Provider } from "react-redux";
import { AppStore, setupStore } from "../../entities/store";
import { useForgetPassword } from ".";
import * as Router from "react-router";
import * as ReactRedux from "../../app/redux";
import * as Helper from "../../shared/helpers/formatsResponse";
import * as Registered from "../../entities/registration/actions";
import * as Actions from "../../entities/forgetPassword/actions";
import * as FormSlice from "../../entities/registration";
import { BrowserRouter } from "react-router-dom";

describe("useForgetPassword", () => {
  const {
    setEmail,
    setPassword,
    setRepeatPassword,
    setActiveStep,
    setEmailCode,
    addLoadingProcess,
  } = FormSlice.registrationFormSlice.actions;

  const setup = (store: AppStore): ReturnType<typeof useForgetPassword> => {
    const { result } = renderHook(() => useForgetPassword(), {
      wrapper: ({ children }) => (
        <BrowserRouter>
          <Provider store={store}>{children}</Provider>
        </BrowserRouter>
      ),
    });

    return result.current;
  };

  const navigate = jest.fn();
  const useDispatchMock = jest.fn();
  const formatsResponseMock = jest.fn();
  const IsValueAlreadyRegisteredMock = jest.fn();
  const sendСodeToEmailMock = jest.fn();
  const changePasswordMock = jest.fn();

  const data = {
    value: "",
    error: false,
    text: "",
  };

  describe("nextStep", () => {
    describe("activeStep===0", () => {
      it('При email.value === "" должен произойти вызов formatsResponse(setEmail)', () => {
        const store: AppStore = setupStore();

        jest.spyOn(Router, "useNavigate").mockImplementation(() => navigate);
        jest
          .spyOn(ReactRedux, "useAppDispatch")
          .mockReturnValue(useDispatchMock);
        jest
          .spyOn(Helper, "formatsResponse")
          .mockReturnValue(formatsResponseMock);

        const { nextStep } = setup(store);

        nextStep();

        expect(Helper.formatsResponse).toBeCalledWith(setEmail);
      });

      it('При email.value !== "" должен произойти вызов IsValueAlreadyRegistered(email.value, "isEmailRegistered")', () => {
        const store: AppStore = setupStore();

        data.value = "exemple@gmail.com";
        store.dispatch(setEmail(data));

        jest.spyOn(Router, "useNavigate").mockImplementation(() => navigate);
        jest
          .spyOn(ReactRedux, "useAppDispatch")
          .mockReturnValue(useDispatchMock);
        jest
          .spyOn(Registered, "IsValueAlreadyRegistered")
          .mockReturnValue(IsValueAlreadyRegisteredMock);

        const { nextStep } = setup(store);

        nextStep();

        expect(Registered.IsValueAlreadyRegistered).toBeCalledWith(
          "exemple@gmail.com",
          "isEmailRegistered"
        );
      });
    });

    describe("activeStep===1", () => {
      it('При password.value === "" должен произойти вызов formatsResponse(setPassword)', () => {
        const store: AppStore = setupStore();

        store.dispatch(setActiveStep({ value: 1 }));

        jest.spyOn(Router, "useNavigate").mockImplementation(() => navigate);
        jest
          .spyOn(ReactRedux, "useAppDispatch")
          .mockReturnValue(useDispatchMock);
        jest
          .spyOn(Helper, "formatsResponse")
          .mockReturnValue(formatsResponseMock);

        const { nextStep } = setup(store);

        nextStep();

        expect(Helper.formatsResponse).toBeCalledWith(setPassword);
      });

      it('При password.value !== "", repeatPassword.value === "" должен произойти вызов formatsResponse(setRepeatPassword)', () => {
        const store: AppStore = setupStore();

        store.dispatch(setActiveStep({ value: 1 }));

        data.value = "testPassword";
        store.dispatch(setPassword(data));

        jest.spyOn(Router, "useNavigate").mockImplementation(() => navigate);
        jest
          .spyOn(ReactRedux, "useAppDispatch")
          .mockReturnValue(useDispatchMock);
        jest
          .spyOn(Helper, "formatsResponse")
          .mockReturnValue(formatsResponseMock);

        const { nextStep } = setup(store);

        nextStep();

        expect(Helper.formatsResponse).toBeCalledWith(setRepeatPassword);
      });

      it(`При repeatPassword.value !== password.value должен произойти вызов
    formatsResponse(setRepeatPassword, repeatPassword.value, "Пароль не совпадает")`, () => {
        const store: AppStore = setupStore();

        store.dispatch(setActiveStep({ value: 1 }));

        data.value = "testPassword";
        store.dispatch(setPassword(data));

        data.value = "testRepeatPassword";
        store.dispatch(setRepeatPassword(data));

        jest.spyOn(Router, "useNavigate").mockImplementation(() => navigate);
        jest
          .spyOn(ReactRedux, "useAppDispatch")
          .mockReturnValue(useDispatchMock);
        jest
          .spyOn(Helper, "formatsResponse")
          .mockReturnValue(formatsResponseMock);

        const { nextStep } = setup(store);

        nextStep();

        expect(Helper.formatsResponse).toBeCalledWith(
          setRepeatPassword,
          "testRepeatPassword",
          "Пароль не совпадает"
        );
      });

      it(`Если пароль короче 6 символов должен сработать
    formatsResponse(setPassword, "Test", "Пароль не может быть короче 6 символов")`, () => {
        const store: AppStore = setupStore();

        store.dispatch(setActiveStep({ value: 1 }));

        data.value = "Test";
        store.dispatch(setPassword(data));
        store.dispatch(setRepeatPassword(data));

        jest.spyOn(Router, "useNavigate").mockImplementation(() => navigate);
        jest
          .spyOn(ReactRedux, "useAppDispatch")
          .mockReturnValue(useDispatchMock);
        jest
          .spyOn(Helper, "formatsResponse")
          .mockReturnValue(formatsResponseMock);

        const { nextStep } = setup(store);

        nextStep();

        expect(Helper.formatsResponse).toBeCalledWith(
          setPassword,
          "Test",
          "Пароль не может быть короче 6 символов"
        );
      });

      it(`Если пароль не содержит заглавных символов должен сработать
    formatsResponse(setPassword, "password", "Пароль должен содержать хотя бы одну заглавную букву")`, () => {
        const store: AppStore = setupStore();

        store.dispatch(setActiveStep({ value: 1 }));

        data.value = "password";
        store.dispatch(setPassword(data));
        store.dispatch(setRepeatPassword(data));

        jest.spyOn(Router, "useNavigate").mockImplementation(() => navigate);
        jest
          .spyOn(ReactRedux, "useAppDispatch")
          .mockReturnValue(useDispatchMock);
        jest
          .spyOn(Helper, "formatsResponse")
          .mockReturnValue(formatsResponseMock);

        const { nextStep } = setup(store);

        nextStep();

        expect(Helper.formatsResponse).toBeCalledWith(
          setPassword,
          "password",
          "Пароль должен содержать хотя бы одну заглавную букву"
        );
      });

      it(`Если пароль не содержит строчных символов должен сработать
    formatsResponse(setPassword, "PASSWORD", "Пароль должен содержать хотя бы одну строчную букву")`, () => {
        const store: AppStore = setupStore();

        store.dispatch(setActiveStep({ value: 1 }));

        data.value = "PASSWORD";
        store.dispatch(setPassword(data));
        store.dispatch(setRepeatPassword(data));

        jest.spyOn(Router, "useNavigate").mockImplementation(() => navigate);
        jest
          .spyOn(ReactRedux, "useAppDispatch")
          .mockReturnValue(useDispatchMock);
        jest
          .spyOn(Helper, "formatsResponse")
          .mockReturnValue(formatsResponseMock);

        const { nextStep } = setup(store);

        nextStep();

        expect(Helper.formatsResponse).toBeCalledWith(
          setPassword,
          "PASSWORD",
          "Пароль должен содержать хотя бы одну строчную букву"
        );
      });

      it(`Если пароль не содержит хотябы одну цифру должен сработать
    formatsResponse(setPassword, "Password", "Пароль должен содержать хотя бы одну цифру")`, () => {
        const store: AppStore = setupStore();

        store.dispatch(setActiveStep({ value: 1 }));

        data.value = "Password";
        store.dispatch(setPassword(data));
        store.dispatch(setRepeatPassword(data));

        jest.spyOn(Router, "useNavigate").mockImplementation(() => navigate);
        jest
          .spyOn(ReactRedux, "useAppDispatch")
          .mockReturnValue(useDispatchMock);
        jest
          .spyOn(Helper, "formatsResponse")
          .mockReturnValue(formatsResponseMock);

        const { nextStep } = setup(store);

        nextStep();

        expect(Helper.formatsResponse).toBeCalledWith(
          setPassword,
          "Password",
          "Пароль должен содержать хотя бы одну цифру"
        );
      });

      it("Если isThereError === false должен сработать sendСodeToEmail({email: example@example.com})", () => {
        const store: AppStore = setupStore();

        store.dispatch(setActiveStep({ value: 1 }));

        data.value = "Password000";
        store.dispatch(setPassword(data));
        store.dispatch(setRepeatPassword(data));

        data.value = "example@example.com";
        store.dispatch(setEmail(data));

        jest.spyOn(Router, "useNavigate").mockImplementation(() => navigate);
        jest
          .spyOn(ReactRedux, "useAppDispatch")
          .mockReturnValue(useDispatchMock);
        jest
          .spyOn(Actions, "sendСodeToEmail")
          .mockReturnValue(sendСodeToEmailMock);

        const { nextStep } = setup(store);

        nextStep();

        store.subscribe(() =>
          expect(store.getState().registrationForm.activeStep).toEqual(2)
        );

        expect(Actions.sendСodeToEmail).toBeCalledWith({
          email: "example@example.com",
        });
      });
    });

    describe("activeStep===2", () => {
      it('При emailCode.value === "" должен произойти вызов formatsResponse(setEmailCode)', () => {
        const store: AppStore = setupStore();

        store.dispatch(setActiveStep({ value: 2 }));

        jest.spyOn(Router, "useNavigate").mockImplementation(() => navigate);
        jest
          .spyOn(ReactRedux, "useAppDispatch")
          .mockReturnValue(useDispatchMock);
        jest
          .spyOn(Helper, "formatsResponse")
          .mockReturnValue(formatsResponseMock);

        const { nextStep } = setup(store);

        nextStep();

        expect(Helper.formatsResponse).toBeCalledWith(setEmailCode);
      });

      it(`При emailCode.value !== '' && emailCode.value.length !== 4 
      должен произойти вызов formatsResponse(setEmailCode, emailCode.value, "Код неверный")`, () => {
        const store: AppStore = setupStore();

        store.dispatch(setActiveStep({ value: 2 }));

        data.value = "12345";
        store.dispatch(setEmailCode(data));

        jest.spyOn(Router, "useNavigate").mockImplementation(() => navigate);
        jest
          .spyOn(ReactRedux, "useAppDispatch")
          .mockReturnValue(useDispatchMock);
        jest
          .spyOn(Helper, "formatsResponse")
          .mockReturnValue(formatsResponseMock);

        const { nextStep } = setup(store);

        nextStep();

        expect(Helper.formatsResponse).toBeCalledWith(
          setEmailCode,
          "12345",
          "Код неверный"
        );
      });

      it(`При emailCode.value !== '' и если в emailCode.value присутствуют не цифры
      должен произойти вызов formatsResponse(setEmailCode, emailCode.value, "Код неверный")`, () => {
        const store: AppStore = setupStore();

        store.dispatch(setActiveStep({ value: 2 }));

        data.value = "Test";
        store.dispatch(setEmailCode(data));

        jest.spyOn(Router, "useNavigate").mockImplementation(() => navigate);
        jest
          .spyOn(ReactRedux, "useAppDispatch")
          .mockReturnValue(useDispatchMock);
        jest
          .spyOn(Helper, "formatsResponse")
          .mockReturnValue(formatsResponseMock);

        const { nextStep } = setup(store);

        nextStep();

        expect(Helper.formatsResponse).toBeCalledWith(
          setEmailCode,
          "Test",
          "Код неверный"
        );
      });

      it(`Если isThereError === false должен произойти вызов
      changePassword(
        {
          email: email.value,
          code: emailCode.value,
          password: password.value,
        },
        navigate
      )`, () => {
        const store: AppStore = setupStore();

        store.dispatch(setActiveStep({ value: 2 }));

        data.value = "exemple@gmail.com";
        store.dispatch(setEmail(data));

        data.value = "Password000";
        store.dispatch(setPassword(data));

        data.value = "1234";
        store.dispatch(setEmailCode(data));

        jest.spyOn(Router, "useNavigate").mockImplementation(() => navigate);
        jest
          .spyOn(ReactRedux, "useAppDispatch")
          .mockReturnValue(useDispatchMock);
        jest
          .spyOn(Actions, "changePassword")
          .mockReturnValue(changePasswordMock);

        const { nextStep } = setup(store);

        nextStep();

        expect(Actions.changePassword).toBeCalledWith(
          {
            email: "exemple@gmail.com",
            code: "1234",
            password: "Password000",
          },
          navigate
        );
      });
    });

    test("Неверное значение activeStep===3", () => {
      const store: AppStore = setupStore();

      store.dispatch(setActiveStep({ value: 3 }));

      jest.spyOn(Router, "useNavigate").mockImplementation(() => navigate);
      jest.spyOn(ReactRedux, "useAppDispatch").mockReturnValue(useDispatchMock);
      jest
        .spyOn(Helper, "formatsResponse")
        .mockReturnValue(formatsResponseMock);
      jest
        .spyOn(Actions, "sendСodeToEmail")
        .mockReturnValue(sendСodeToEmailMock);
      jest.spyOn(Actions, "changePassword").mockReturnValue(changePasswordMock);

      const { nextStep } = setup(store);

      nextStep();

      expect(Router.useNavigate).toBeCalledTimes(1);
      expect(ReactRedux.useAppDispatch).toBeCalledTimes(1);
      expect(Helper.formatsResponse).not.toBeCalled();
      expect(Actions.sendСodeToEmail).not.toBeCalled();
      expect(Actions.changePassword).not.toBeCalled();
    });
  });

  describe("getLoadingStatus", () => {
    it("isLoading.length === 0 должен вурнуть false", () => {
      const store: AppStore = setupStore();

      jest.spyOn(Router, "useNavigate").mockImplementation(() => navigate);
      jest.spyOn(ReactRedux, "useAppDispatch").mockReturnValue(useDispatchMock);

      const { getLoadingStatus } = setup(store);

      expect(getLoadingStatus()).toBeFalsy();
    });

    it("isLoading.length !== 0 должен вурнуть true", () => {
      const store: AppStore = setupStore();

      store.dispatch(addLoadingProcess({ value: "someProcess" }));

      jest.spyOn(Router, "useNavigate").mockImplementation(() => navigate);
      jest.spyOn(ReactRedux, "useAppDispatch").mockReturnValue(useDispatchMock);

      const { getLoadingStatus } = setup(store);

      expect(getLoadingStatus()).toBeTruthy();
    });
  });

  describe("previousStep", () => {
    it('activeStep === 0 должен вызвать navigate("/auth")', () => {
      const store: AppStore = setupStore();

      jest.spyOn(Router, "useNavigate").mockImplementation(() => navigate);
      jest.spyOn(ReactRedux, "useAppDispatch").mockReturnValue(useDispatchMock);

      const { previousStep } = setup(store);

      previousStep();

      expect(navigate).toBeCalledWith("/auth");
    });

    it("activeStep !== 0 должен вызвать setActiveStep({ value: activeStep - 1 })", () => {
      const store: AppStore = setupStore();

      store.dispatch(setActiveStep({ value: 1 }));

      jest.spyOn(Router, "useNavigate").mockImplementation(() => navigate);
      jest.spyOn(ReactRedux, "useAppDispatch").mockReturnValue(useDispatchMock);

      const { previousStep } = setup(store);

      previousStep();

      expect(useDispatchMock).toBeCalledWith(setActiveStep({ value: 0 }));
    });
  });

  describe("getButtonTitle", () => {
    it('Если activeStep !== steps.length - 1 должен вернуть строку "Вперёд"', () => {
      const store: AppStore = setupStore();

      jest.spyOn(Router, "useNavigate").mockImplementation(() => navigate);
      jest.spyOn(ReactRedux, "useAppDispatch").mockReturnValue(useDispatchMock);

      const { getButtonTitle } = setup(store);

      expect(getButtonTitle()).toBe("Вперёд");
    });

    it('Если activeStep === steps.length - 1 должен вернуть строку "Отправить данные"', () => {
      const store: AppStore = setupStore();

      store.dispatch(setActiveStep({ value: 4 }));

      jest.spyOn(Router, "useNavigate").mockImplementation(() => navigate);
      jest.spyOn(ReactRedux, "useAppDispatch").mockReturnValue(useDispatchMock);

      const { getButtonTitle } = setup(store);

      expect(getButtonTitle()).toBe("Отправить данные");
    });
  });
});
