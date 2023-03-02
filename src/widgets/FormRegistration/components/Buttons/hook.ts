import {
  ChekEmailCode,
  IsValueAlreadyRegistered,
} from "../../../../entities/registration/actions";
import { useAppDispatch, useAppSelector } from "../../../../app/redux";
import { registrationFormSlice } from "../../../../entities/registration";
import { useEffect } from "react";
import { registerNewUser } from "../../../../shared/api/registration/registration";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";

export const useRegistration = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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

  const formValues = useAppSelector((state) => state.registrationForm);

  useEffect(() => {
    switch (formValues.activeStep) {
      case 1:
        if (
          formValues.isLoading.length === 0 &&
          !formValues.data.phoneNumber.error &&
          !formValues.data.email.error
        )
          dispatch(setActiveStep({ value: formValues.activeStep + 1 }));
        break;
      case 2:
        if (formValues.isLoading.length === 0 && !formValues.data.tgToken.error)
          dispatch(setActiveStep({ value: formValues.activeStep + 1 }));
        break;
      case 4:
        console.log("redirect main");
        break;
      default:
        if (formValues.activeStep > 3)
          console.error(
            `Для значения activeStep: ${formValues.activeStep} не задан сценарий!`
          );
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formValues.isLoading]);

  const isThereErrorInTheTextField = (step: number) => {
    const formatsResponse = (
      action: any,
      value: string = "",
      text: string = "Поле не может быть пустым"
    ) => {
      isThereError = true;
      dispatch(
        action({
          value,
          error: true,
          text,
        })
      );
    };

    let isThereError: boolean = false;
    switch (step) {
      case 0:
        if (
          formValues.data.firstName.error ||
          formValues.data.middleName.error ||
          formValues.data.lastName.error
        )
          isThereError = true;
        if (formValues.data.firstName.value === "")
          formatsResponse(setFirstName);
        if (formValues.data.middleName.value === "")
          formatsResponse(setMiddleName);
        if (formValues.data.lastName.value === "") formatsResponse(setLastName);
        !isThereError &&
          dispatch(setActiveStep({ value: formValues.activeStep + 1 }));
        break;
      case 1:
        if (formValues.data.phoneNumber.value === "+7")
          formatsResponse(setPhoneNumber, "+7", "Укажите свой номер телефона");
        if (formValues.data.phoneNumber.value.length < 16)
          formatsResponse(
            setPhoneNumber,
            formValues.data.phoneNumber.value,
            "Номер телефона не может быть короче 11 цифер"
          );
        if (formValues.data.email.value === "") formatsResponse(setEmail);
        if (formValues.data.city.value === "") formatsResponse(setCity);
        if (!isThereError) {
          dispatch(
            IsValueAlreadyRegistered(
              formValues.data.email.value,
              "isEmailAlreadyRegistered"
            )
          );
          dispatch(
            IsValueAlreadyRegistered(
              formValues.data.phoneNumber.value,
              "isPhoneNumberAlreadyRegistered"
            )
          );
        }
        break;
      case 2:
        if (formValues.data.tgToken.value === "") {
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
              formValues.data.tgToken.value,
              "isTokenTgAlreadyRegistered"
            )
          );
        break;
      case 3:
        if (formValues.data.password.value === "") formatsResponse(setPassword);
        if (formValues.data.repeatPassword.value === "")
          formatsResponse(setRepeatPassword);
        if (
          formValues.data.repeatPassword.value !==
          formValues.data.password.value
        )
          formatsResponse(
            setRepeatPassword,
            formValues.data.repeatPassword.value,
            "Пароль не совпадает"
          );
        if (formValues.data.password.value.length < 6)
          formatsResponse(
            setPassword,
            formValues.data.password.value,
            "Пароль не может быть короче 6 символов"
          );
        if (!/[A-Z]/g.test(formValues.data.password.value))
          formatsResponse(
            setPassword,
            formValues.data.password.value,
            "Пароль должен содержать хотя бы одну заглавную букву"
          );
        if (!/[a-z]/g.test(formValues.data.password.value))
          formatsResponse(
            setPassword,
            formValues.data.password.value,
            "Пароль должен содержать хотя бы одну строчную букву"
          );
        if (!/[0-9]/g.test(formValues.data.password.value))
          formatsResponse(
            setPassword,
            formValues.data.password.value,
            "Пароль должен содержать хотя бы одну цифру"
          );
        if (!isThereError)
          dispatch(setActiveStep({ value: formValues.activeStep + 1 }));
        {
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
          } = formValues.data;
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
        }

        let message = "Новое Письмо!";
        let description = `Вам на ваш почтовый ящик ${formValues.data.email.value} выслано письмо с кодом активации акаунта`;
        notification.info({ message, description, placement: "topLeft" });
        break;
      case 4:
        // Код для активации акаунта состоит из строки 4 цифры
        if (formValues.data.emailCode.value === "")
          formatsResponse(setEmailCode);

        if (formValues.data.emailCode.value.length !== 4)
          formatsResponse(
            setEmailCode,
            formValues.data.emailCode.value,
            "Код неверный"
          );

        if (!isThereError) {
          dispatch(
            ChekEmailCode(
              formValues.data.email.value,
              formValues.data.emailCode.value,
              navigate
            )
          );
        }
        break;
      default:
        console.error(`Не найдено совпадений для параметра ${step}`);
    }
  };

  return { isThereErrorInTheTextField };
};
