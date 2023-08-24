import { renderHook } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { AppStore, setupStore } from "../../entities/store";
import { useRegistration } from ".";
import { registrationFormSlice } from "../../entities/registration";
import * as Router from "react-router";
import * as ReactRedux from "../../app/redux";
import * as Helper from "../../shared/helpers/formatsResponse";
import * as Registration from "../../entities/registration/actions";
import * as NewUser from "../../shared/api/registration/registration";
import { notification } from "antd";

describe("useRegistration", () => {
  const setup = (store: AppStore): ReturnType<typeof useRegistration> => {
    const { result } = renderHook(() => useRegistration(), {
      wrapper: ({ children }) => (
        <BrowserRouter>
          <Provider store={store}>{children}</Provider>
        </BrowserRouter>
      ),
    });

    return result.current;
  };

  const {
    setLastName,
    setFirstName,
    setMiddleName,
    setPhoneNumber,
    setEmail,
    setCity,
    setTgToken,
    setPassword,
    setRepeatPassword,
    setActiveStep,
    setEmailCode,
    addLoadingProcess,
  } = registrationFormSlice.actions;

  const navigate = jest.fn();
  const useDispatchMock = jest.fn();

  let data = {
    value: "",
    error: false,
    text: "",
  };

  let store: AppStore = setupStore();

  beforeEach(() => {
    data = {
      value: "",
      error: false,
      text: "",
    };
    store = setupStore();
  });

  describe("nextStep", () => {
    describe("activeStep===0", () => {
      it(`Если firstName.value === "", middleName.value === "",lastName.value === "" должны произойти вызовы
        formatsResponse(setFirstName),formatsResponse(setMiddleName),formatsResponse(setLastName)`, () => {
        jest.spyOn(Router, "useNavigate").mockImplementation(() => navigate);
        jest
          .spyOn(ReactRedux, "useAppDispatch")
          .mockReturnValue(useDispatchMock);
        jest.spyOn(Helper, "formatsResponse").mockReturnValue(jest.fn());

        const { nextStep } = setup(store);

        nextStep();

        expect(Helper.formatsResponse).toBeCalledTimes(3);
        expect(Helper.formatsResponse).toBeCalledWith(setFirstName);
        expect(Helper.formatsResponse).toBeCalledWith(setMiddleName);
        expect(Helper.formatsResponse).toBeCalledWith(setLastName);
      });

      it("При firstName.error || middleName.error || lastName.error недолжен произходить вызов formatsResponse", () => {
        // 1.Заполним firstName.value, middleName.value, lastName.value значениями, для того чтобы пройти успешно проверки на пустое значение
        data.value = "Test";
        store.dispatch(setFirstName(data));
        store.dispatch(setMiddleName(data));
        store.dispatch(setLastName(data));

        // 2. Установим ошибку у firstName
        data.error = true;
        store.dispatch(setFirstName(data));

        jest.spyOn(Router, "useNavigate").mockImplementation(() => navigate);
        jest
          .spyOn(ReactRedux, "useAppDispatch")
          .mockReturnValue(useDispatchMock);
        jest.spyOn(Helper, "formatsResponse").mockReturnValue(jest.fn());

        const { nextStep } = setup(store);

        nextStep();

        expect(Router.useNavigate).toBeCalledTimes(1);
        expect(ReactRedux.useAppDispatch).toBeCalledTimes(1);
        expect(Helper.formatsResponse).not.toBeCalled();
      });

      it(`Если firstName.value, middleName.value, lastName.value неравны "" и свойство error===false 
      должен произойти вызов setActiveStep({ value: 1 })`, () => {
        data.value = "Test";
        store.dispatch(setFirstName(data));
        store.dispatch(setMiddleName(data));
        store.dispatch(setLastName(data));

        jest.spyOn(Router, "useNavigate").mockImplementation(() => navigate);
        jest
          .spyOn(ReactRedux, "useAppDispatch")
          .mockReturnValue(useDispatchMock);
        jest.spyOn(Helper, "formatsResponse").mockReturnValue(jest.fn());

        const { nextStep } = setup(store);

        nextStep();

        expect(useDispatchMock).toBeCalledWith(setActiveStep({ value: 1 }));
      });
    });

    describe("activeStep===1", () => {
      it(`Если phoneNumber.value === "+7",email.value === "",city.value === ""
      должны произойти вызовы:
      formatsResponse(setPhoneNumber, "+7", "Укажите свой номер телефона")
      formatsResponse(setEmail)
      formatsResponse(setCity)`, () => {
        store.dispatch(setActiveStep({ value: 1 }));

        jest.spyOn(Router, "useNavigate").mockImplementation(() => navigate);
        jest
          .spyOn(ReactRedux, "useAppDispatch")
          .mockReturnValue(useDispatchMock);
        jest.spyOn(Helper, "formatsResponse").mockReturnValue(jest.fn());

        const { nextStep } = setup(store);

        nextStep();

        expect(Helper.formatsResponse).toBeCalledTimes(3);
        expect(Helper.formatsResponse).toBeCalledWith(
          setPhoneNumber,
          "+7",
          "Укажите свой номер телефона"
        );
        expect(Helper.formatsResponse).toBeCalledWith(setEmail);
        expect(Helper.formatsResponse).toBeCalledWith(setCity);
      });

      it(`Если phoneNumber.value.length < 16 и email.value !== ""
      должны произойти вызовы
      formatsResponse(
        setPhoneNumber,
        phoneNumber.value,
        "Номер телефона не может быть короче 11 цифер"
      )
      formatsResponse(setEmail)
      formatsResponse(setCity)`, () => {
        store.dispatch(setActiveStep({ value: 1 }));

        data.value = "+7(000)";
        store.dispatch(setPhoneNumber(data));

        jest.spyOn(Router, "useNavigate").mockImplementation(() => navigate);
        jest
          .spyOn(ReactRedux, "useAppDispatch")
          .mockReturnValue(useDispatchMock);
        jest.spyOn(Helper, "formatsResponse").mockReturnValue(jest.fn());

        const { nextStep } = setup(store);

        nextStep();

        expect(Helper.formatsResponse).toBeCalledTimes(3);
        expect(Helper.formatsResponse).toBeCalledWith(
          setPhoneNumber,
          "+7(000)",
          "Номер телефона не может быть короче 11 цифер"
        );
        expect(Helper.formatsResponse).toBeCalledWith(setEmail);
        expect(Helper.formatsResponse).toBeCalledWith(setCity);
      });

      it(`Если все проверки пройдены и isThereError=false
      должны произойти вызовы
      IsValueAlreadyRegisteredMock(email.value, "IsThisEmailFree")
      IsValueAlreadyRegisteredMock(
        phoneNumber.value,
        "isPhoneNumberAlreadyRegistered"
      )`, () => {
        store.dispatch(setActiveStep({ value: 1 }));

        data.value = "+7(000) 000 0000";
        store.dispatch(setPhoneNumber(data));

        data.value = "example@example.com";
        store.dispatch(setEmail(data));

        data.value = "Lapland";
        store.dispatch(setCity(data));

        jest.spyOn(Router, "useNavigate").mockImplementation(() => navigate);
        jest
          .spyOn(ReactRedux, "useAppDispatch")
          .mockReturnValue(useDispatchMock);
        jest
          .spyOn(Registration, "IsValueAlreadyRegistered")
          .mockReturnValue(jest.fn());

        const { nextStep } = setup(store);

        nextStep();

        expect(Registration.IsValueAlreadyRegistered).toBeCalledTimes(2);
        expect(Registration.IsValueAlreadyRegistered).toBeCalledWith(
          "example@example.com",
          "IsThisEmailFree"
        );
        expect(Registration.IsValueAlreadyRegistered).toBeCalledWith(
          "+7(000) 000 0000",
          "isPhoneNumberAlreadyRegistered"
        );
      });
    });

    describe("activeStep===2", () => {
      it(`Если tgToken.value === "" тогда должен произойти вызов
      setTgToken({
       value: "",
       error: true,
       text: "Поле не может быть пустым",
      })`, () => {
        store.dispatch(setActiveStep({ value: 2 }));

        jest.spyOn(Router, "useNavigate").mockImplementation(() => navigate);
        jest
          .spyOn(ReactRedux, "useAppDispatch")
          .mockReturnValue(useDispatchMock);

        const { nextStep } = setup(store);

        nextStep();

        expect(useDispatchMock).toBeCalledWith(
          setTgToken({
            value: "",
            error: true,
            text: "Поле не может быть пустым",
          })
        );
      });

      it(`Если tgToken.value !== "" тогда должен произойти вызов
      setTgToken({
       value: "",
       error: true,
       text: "Поле не может быть пустым",
      })`, () => {
        store.dispatch(setActiveStep({ value: 2 }));

        data.value = "token";
        store.dispatch(setTgToken(data));

        jest.spyOn(Router, "useNavigate").mockImplementation(() => navigate);
        jest
          .spyOn(ReactRedux, "useAppDispatch")
          .mockReturnValue(useDispatchMock);
        jest
          .spyOn(Registration, "IsValueAlreadyRegistered")
          .mockReturnValue(jest.fn());

        const { nextStep } = setup(store);

        nextStep();

        expect(Registration.IsValueAlreadyRegistered).toBeCalledWith(
          "token",
          "isTokenTgAlreadyRegistered"
        );
      });
    });

    describe("activeStep===3", () => {
      it(`Если password.value === "", repeatPassword.value === "" должны произойти вызовы
      formatsResponse(setPassword),formatsResponse(setRepeatPassword)`, () => {
        store.dispatch(setActiveStep({ value: 3 }));

        jest.spyOn(Router, "useNavigate").mockImplementation(() => navigate);
        jest
          .spyOn(ReactRedux, "useAppDispatch")
          .mockReturnValue(useDispatchMock);
        jest.spyOn(Helper, "formatsResponse").mockReturnValue(jest.fn());

        const { nextStep } = setup(store);

        nextStep();

        expect(Helper.formatsResponse).toBeCalledTimes(2);
        expect(Helper.formatsResponse).toBeCalledWith(setPassword);
        expect(Helper.formatsResponse).toBeCalledWith(setRepeatPassword);
      });

      it(`Если repeatPassword.value !== password.value должны произойти вызовы
      formatsResponse(setRepeatPassword, repeatPassword.value, "Пароль не совпадает"),
      formatsResponse( setPassword, password.value, "Пароль должен содержать хотя бы одну цифру")`, () => {
        store.dispatch(setActiveStep({ value: 3 }));

        data.value = "Password";
        store.dispatch(setPassword(data));

        data.value = "NotPassword";
        store.dispatch(setRepeatPassword(data));

        jest.spyOn(Router, "useNavigate").mockImplementation(() => navigate);
        jest
          .spyOn(ReactRedux, "useAppDispatch")
          .mockReturnValue(useDispatchMock);
        jest.spyOn(Helper, "formatsResponse").mockReturnValue(jest.fn());

        const { nextStep } = setup(store);

        nextStep();

        expect(Helper.formatsResponse).toBeCalledTimes(2);
        expect(Helper.formatsResponse).toBeCalledWith(
          setRepeatPassword,
          "NotPassword",
          "Пароль не совпадает"
        );
        expect(Helper.formatsResponse).toBeCalledWith(
          setPassword,
          "Password",
          "Пароль должен содержать хотя бы одну цифру"
        );
      });

      it(`Если password.value !== "" и password.value.length < 6 должен произойти вызов
      formatsResponse( setPassword, password.value, "Пароль не может быть короче 6 символов")`, () => {
        store.dispatch(setActiveStep({ value: 3 }));

        data.value = "Test";
        store.dispatch(setPassword(data));
        store.dispatch(setRepeatPassword(data));

        jest.spyOn(Router, "useNavigate").mockImplementation(() => navigate);
        jest
          .spyOn(ReactRedux, "useAppDispatch")
          .mockReturnValue(useDispatchMock);
        jest.spyOn(Helper, "formatsResponse").mockReturnValue(jest.fn());

        const { nextStep } = setup(store);

        nextStep();

        expect(Helper.formatsResponse).toBeCalledTimes(1);
        expect(Helper.formatsResponse).toBeCalledWith(
          setPassword,
          "Test",
          "Пароль не может быть короче 6 символов"
        );
      });

      it(`Если password.value !== "" и пароль не содержит не одной заглавной буквы, должен произойти вызов
      formatsResponse( setPassword, password.value, "Пароль должен содержать хотя бы одну заглавную букву")`, () => {
        store.dispatch(setActiveStep({ value: 3 }));

        data.value = "supertest";
        store.dispatch(setPassword(data));
        store.dispatch(setRepeatPassword(data));

        jest.spyOn(Router, "useNavigate").mockImplementation(() => navigate);
        jest
          .spyOn(ReactRedux, "useAppDispatch")
          .mockReturnValue(useDispatchMock);
        jest.spyOn(Helper, "formatsResponse").mockReturnValue(jest.fn());

        const { nextStep } = setup(store);

        nextStep();

        expect(Helper.formatsResponse).toBeCalledTimes(1);
        expect(Helper.formatsResponse).toBeCalledWith(
          setPassword,
          "supertest",
          "Пароль должен содержать хотя бы одну заглавную букву"
        );
      });

      it(`Если password.value !== "" и пароль не содержит не одной строчной буквы, должен произойти вызов
      formatsResponse( setPassword, password.value, "Пароль должен содержать хотя бы одну строчную букву")`, () => {
        store.dispatch(setActiveStep({ value: 3 }));

        data.value = "PASSWORD";
        store.dispatch(setPassword(data));
        store.dispatch(setRepeatPassword(data));

        jest.spyOn(Router, "useNavigate").mockImplementation(() => navigate);
        jest
          .spyOn(ReactRedux, "useAppDispatch")
          .mockReturnValue(useDispatchMock);
        jest.spyOn(Helper, "formatsResponse").mockReturnValue(jest.fn());

        const { nextStep } = setup(store);

        nextStep();

        expect(Helper.formatsResponse).toBeCalledTimes(1);
        expect(Helper.formatsResponse).toBeCalledWith(
          setPassword,
          "PASSWORD",
          "Пароль должен содержать хотя бы одну строчную букву"
        );
      });

      it(`Если password.value !== "" и пароль не содержит не одной цифры, должен произойти вызов
      formatsResponse( setPassword, password.value, "Пароль должен содержать хотя бы одну цифру")`, () => {
        store.dispatch(setActiveStep({ value: 3 }));

        data.value = "Password";
        store.dispatch(setPassword(data));
        store.dispatch(setRepeatPassword(data));

        jest.spyOn(Router, "useNavigate").mockImplementation(() => navigate);
        jest
          .spyOn(ReactRedux, "useAppDispatch")
          .mockReturnValue(useDispatchMock);
        jest.spyOn(Helper, "formatsResponse").mockReturnValue(jest.fn());

        const { nextStep } = setup(store);

        nextStep();

        expect(Helper.formatsResponse).toBeCalledTimes(1);
        expect(Helper.formatsResponse).toBeCalledWith(
          setPassword,
          "Password",
          "Пароль должен содержать хотя бы одну цифру"
        );
      });

      it(`Если все проверки пройдены и isThereError=false, должен произойти вызов
      registerNewUser(с соответствующими аргументами),setActiveStep({ value: activeStep + 1 }), notification.info`, () => {
        store.dispatch(setActiveStep({ value: 3 }));

        data.value = "Password111";
        store.dispatch(setPassword(data));
        store.dispatch(setRepeatPassword(data));

        data.value = "example@example.com";
        store.dispatch(setEmail(data));

        jest.spyOn(Router, "useNavigate").mockImplementation(() => navigate);
        jest
          .spyOn(ReactRedux, "useAppDispatch")
          .mockReturnValue(useDispatchMock);
        jest.spyOn(NewUser, "registerNewUser").mockImplementation(jest.fn());
        const spy = jest.spyOn(notification, "info");

        const { nextStep } = setup(store);

        nextStep();

        expect(NewUser.registerNewUser).toBeCalledTimes(1);
        expect(NewUser.registerNewUser).toBeCalledWith({
          firstName: "",
          lastName: "",
          middleName: "",
          phoneNumber: "+7",
          email: "example@example.com",
          country: "Россия",
          city: "",
          tgToken: "",
          password: "Password111",
        });
        expect(useDispatchMock).toBeCalledWith(setActiveStep({ value: 4 }));
        expect(spy).toBeCalledWith({
          message: "Новое Письмо!",
          description: `Вам на ваш почтовый ящик example@example.com выслано письмо с кодом активации акаунта`,
          placement: "topLeft",
        });
      });
    });

    describe("activeStep===4", () => {
      it('Если emailCode.value === "" должен произойти вызов formatsResponse(setEmailCode)', () => {
        store.dispatch(setActiveStep({ value: 4 }));

        jest.spyOn(Router, "useNavigate").mockImplementation(() => navigate);
        jest
          .spyOn(ReactRedux, "useAppDispatch")
          .mockReturnValue(useDispatchMock);
        jest.spyOn(Helper, "formatsResponse").mockReturnValue(jest.fn());

        const { nextStep } = setup(store);

        nextStep();

        expect(Helper.formatsResponse).toBeCalledTimes(1);
        expect(Helper.formatsResponse).toBeCalledWith(setEmailCode);
      });

      it('Если emailCode.value.length !== 4 должен произойти вызов formatsResponse(setEmailCode, emailCode.value, "Код неверный")', () => {
        store.dispatch(setActiveStep({ value: 4 }));

        data.value = "123";
        store.dispatch(setEmailCode(data));

        jest.spyOn(Router, "useNavigate").mockImplementation(() => navigate);
        jest
          .spyOn(ReactRedux, "useAppDispatch")
          .mockReturnValue(useDispatchMock);
        jest.spyOn(Helper, "formatsResponse").mockReturnValue(jest.fn());

        const { nextStep } = setup(store);

        nextStep();

        expect(Helper.formatsResponse).toBeCalledTimes(1);
        expect(Helper.formatsResponse).toBeCalledWith(
          setEmailCode,
          "123",
          "Код неверный"
        );
      });

      it('Если emailCode.value содержит не только цифры должен произойти вызов formatsResponse(setEmailCode, emailCode.value, "Код неверный")', () => {
        store.dispatch(setActiveStep({ value: 4 }));

        data.value = "123А";
        store.dispatch(setEmailCode(data));

        jest.spyOn(Router, "useNavigate").mockImplementation(() => navigate);
        jest
          .spyOn(ReactRedux, "useAppDispatch")
          .mockReturnValue(useDispatchMock);
        jest.spyOn(Helper, "formatsResponse").mockReturnValue(jest.fn());

        const { nextStep } = setup(store);

        nextStep();

        expect(Helper.formatsResponse).toBeCalledTimes(1);
        expect(Helper.formatsResponse).toBeCalledWith(
          setEmailCode,
          "123А",
          "Код неверный"
        );
      });

      it(`Если все проверки пройдены и isThereError=false, должен произойти вызов
      ChekEmailCode(email.value, emailCode.value, navigate)`, () => {
        store.dispatch(setActiveStep({ value: 4 }));

        data.value = "1234";
        store.dispatch(setEmailCode(data));

        jest.spyOn(Router, "useNavigate").mockImplementation(() => navigate);
        jest
          .spyOn(ReactRedux, "useAppDispatch")
          .mockReturnValue(useDispatchMock);
        jest.spyOn(Registration, "ChekEmailCode").mockReturnValue(jest.fn());

        const { nextStep } = setup(store);

        nextStep();

        expect(Registration.ChekEmailCode).toBeCalledTimes(1);
        expect(Registration.ChekEmailCode).toBeCalledWith("", "1234", navigate);
      });
    });

    test("Неверное значение activeStep===5", () => {
      const store: AppStore = setupStore();

      store.dispatch(setActiveStep({ value: 5 }));

      jest.spyOn(Router, "useNavigate").mockImplementation(() => navigate);
      jest.spyOn(ReactRedux, "useAppDispatch").mockReturnValue(useDispatchMock);
      jest.spyOn(Helper, "formatsResponse").mockReturnValue(jest.fn());

      const { nextStep } = setup(store);

      nextStep();

      expect(Router.useNavigate).toBeCalledTimes(1);
      expect(ReactRedux.useAppDispatch).toBeCalledTimes(1);
      expect(Helper.formatsResponse).not.toBeCalled();
      expect(Registration.ChekEmailCode).not.toBeCalled();
      expect(Registration.IsValueAlreadyRegistered).not.toBeCalled();
      expect(NewUser.registerNewUser).not.toBeCalled();
    });
  });

  describe("getLoadingStatus", () => {
    it("Если isLoading.length === 0 должно вернуться false", () => {
      jest.spyOn(Router, "useNavigate").mockImplementation(() => navigate);
      jest.spyOn(ReactRedux, "useAppDispatch").mockReturnValue(useDispatchMock);

      const { getLoadingStatus } = setup(store);

      expect(getLoadingStatus()).toBeFalsy();
    });

    it("Если isLoading.length !== 0 должно вернуться true", () => {
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
