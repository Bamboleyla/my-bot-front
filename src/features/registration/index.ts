import {
  ChekEmailCode,
  IsValueAlreadyRegistered,
} from "../../entities/registration/actions";
import { useAppDispatch, useAppSelector } from "../../app/redux";
import { registrationFormSlice } from "../../entities/registration";
import { useEffect } from "react";
import { registerNewUser } from "../../shared/api/registration/registration";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";
import { steps } from "../../pages/Registration";
import { formatsResponse } from "../../shared/helpers/formatsResponse";

export interface IuseRegistration {
  nextStep: () => void;
  getLoadingStatus: () => boolean;
  previousStep: () => void;
  getButtonTitle: () => string;
}

export const useRegistration = (): IuseRegistration => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { data, activeStep, isLoading } = useAppSelector(
    (state) => state.registrationForm
  );

  const {
    firstName,
    lastName,
    middleName,
    phoneNumber,
    email,
    country,
    city,
    tgToken,
    password,
    repeatPassword,
    emailCode,
  } = data;

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
  } = registrationFormSlice.actions;

  useEffect(() => {
    switch (activeStep) {
      case 1:
        if (isLoading.length === 0 && !phoneNumber.error && !email.error)
          dispatch(setActiveStep({ value: activeStep + 1 }));
        break;
      case 2:
        if (isLoading.length === 0 && !tgToken.error)
          dispatch(setActiveStep({ value: activeStep + 1 }));
        break;
      default:
        if (activeStep > 3)
          console.error(
            `Для значения activeStep: ${activeStep} не задан сценарий!`
          );
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const nextStep = (): void => {
    let isThereError: boolean = false;

    switch (activeStep) {
      case 0:
        if (firstName.error || middleName.error || lastName.error)
          isThereError = true;
        if (firstName.value === "")
          dispatch(formatsResponse(isThereError, setFirstName));
        if (middleName.value === "")
          dispatch(formatsResponse(isThereError, setMiddleName));
        if (lastName.value === "")
          dispatch(formatsResponse(isThereError, setLastName));
        !isThereError && dispatch(setActiveStep({ value: activeStep + 1 }));
        break;
      case 1:
        if (phoneNumber.value === "+7")
          dispatch(
            formatsResponse(
              isThereError,
              setPhoneNumber,
              "+7",
              "Укажите свой номер телефона"
            )
          );
        if (phoneNumber.value.length < 16)
          dispatch(
            formatsResponse(
              isThereError,
              setPhoneNumber,
              phoneNumber.value,
              "Номер телефона не может быть короче 11 цифер"
            )
          );
        if (email.value === "")
          dispatch(formatsResponse(isThereError, setEmail));
        if (city.value === "") dispatch(formatsResponse(isThereError, setCity));
        if (!isThereError) {
          dispatch(() => {
            IsValueAlreadyRegistered(email.value, "isEmailAlreadyRegistered");
            IsValueAlreadyRegistered(
              phoneNumber.value,
              "isPhoneNumberAlreadyRegistered"
            );
          });
        }
        break;
      case 2:
        if (tgToken.value === "") {
          dispatch(
            setTgToken({
              value: "",
              error: true,
              text: "Поле не может быть пустым",
            })
          );
        } else
          dispatch(
            IsValueAlreadyRegistered(
              tgToken.value,
              "isTokenTgAlreadyRegistered"
            )
          );
        break;
      case 3:
        if (password.value === "")
          dispatch(formatsResponse(isThereError, setPassword));
        if (repeatPassword.value === "")
          dispatch(formatsResponse(isThereError, setRepeatPassword));
        if (repeatPassword.value !== password.value)
          dispatch(
            formatsResponse(
              isThereError,
              setRepeatPassword,
              repeatPassword.value,
              "Пароль не совпадает"
            )
          );

        const result = (message: string) =>
          dispatch(
            formatsResponse(isThereError, setPassword, password.value, message)
          );
        if (password.value.length < 6)
          result("Пароль не может быть короче 6 символов");
        if (!/[A-Z]/g.test(password.value))
          result("Пароль должен содержать хотя бы одну заглавную букву");
        if (!/[a-z]/g.test(password.value))
          result("Пароль должен содержать хотя бы одну строчную букву");
        if (!/[0-9]/g.test(password.value))
          result("Пароль должен содержать хотя бы одну цифру");
        if (!isThereError) dispatch(setActiveStep({ value: activeStep + 1 }));

        registerNewUser({
          firstName: firstName.value,
          lastName: lastName.value,
          middleName: middleName.value,
          phoneNumber: phoneNumber.value.replace(/\s|[()]/g, ""),
          email: email.value,
          country: country.value,
          city: city.value,
          tgToken: tgToken.value,
          password: password.value,
        });

        let message = "Новое Письмо!";
        let description = `Вам на ваш почтовый ящик ${email.value} выслано письмо с кодом активации акаунта`;
        notification.info({ message, description, placement: "topLeft" });
        break;
      case 4:
        // Код для активации акаунта состоит из строки 4 цифры
        if (emailCode.value === "")
          dispatch(formatsResponse(isThereError, setEmailCode));

        if (emailCode.value.length !== 4 || /\D/g.test(emailCode.value))
          dispatch(
            formatsResponse(
              isThereError,
              setEmailCode,
              emailCode.value,
              "Код неверный"
            )
          );

        if (!isThereError) {
          dispatch(ChekEmailCode(email.value, emailCode.value, navigate));
        }
        break;
      default:
        console.error(`Не найдено совпадений для параметра ${activeStep}`);
    }
  };

  const getLoadingStatus = (): boolean => isLoading.length !== 0;

  const previousStep = () => {
    activeStep === 0
      ? navigate("/auth")
      : dispatch(setActiveStep({ value: activeStep - 1 }));
  };

  const getButtonTitle = (): string =>
    activeStep === steps.length - 1 ? "Отправить данные" : "Вперёд";

  return {
    nextStep,
    getLoadingStatus,
    previousStep,
    getButtonTitle,
  };
};
