import { IsValueAlreadyRegistered } from "../../entities/registration/actions";
import {
  changePassword,
  sendСodeToEmail,
} from "../../entities/forgetPassword/actions";
import { useAppDispatch, useAppSelector } from "../../app/redux";
import { registrationFormSlice } from "../../entities/registration";
import { useNavigate } from "react-router-dom";
import { steps } from "../../pages/Registration";
import { useEffect } from "react";
import { formatsResponse } from "../../shared/helpers/formatsResponse";

export interface IuseRegistration {
  nextStep: () => void;
  getLoadingStatus: () => boolean;
  previousStep: () => void;
  getButtonTitle: () => string;
}

export const useForgetPassword = (): IuseRegistration => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { data, activeStep, isLoading } = useAppSelector(
    (state) => state.registrationForm
  );

  const { email, password, repeatPassword, emailCode } = data;

  const {
    setEmail,
    setPassword,
    setRepeatPassword,
    setActiveStep,
    setEmailCode,
  } = registrationFormSlice.actions;

  useEffect(() => {
    switch (activeStep) {
      case 0:
        if (isLoading.length === 0 && !email.error && email.value !== "")
          dispatch(setActiveStep({ value: activeStep + 1 }));
        break;
      default:
        // Некоторые activeStep не нуждаются (1,2) в проверке на завершение процессов и ошибок
        if (activeStep > 2)
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
        if (email.value === "")
          dispatch(formatsResponse(isThereError, setEmail));
        if (!isThereError) {
          dispatch(IsValueAlreadyRegistered(email.value, "isEmailRegistered"));
        }
        break;
      case 1:
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
        if (!isThereError) {
          dispatch(
            sendСodeToEmail({
              email: email.value,
            })
          );
          dispatch(setActiveStep({ value: activeStep + 1 }));
        }
        break;
      case 2:
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
          dispatch(
            changePassword(
              {
                email: email.value,
                code: emailCode.value,
                password: password.value,
              },
              navigate
            )
          );
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
