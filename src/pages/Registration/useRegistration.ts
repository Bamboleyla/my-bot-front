import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { registrationFormSlice } from "../../store/reducers/RegistrationFormSlice";

export const useRegistration = () => {
  const dispatch = useAppDispatch();
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
  } = registrationFormSlice.actions;

  const formValues = useAppSelector((state) => state.registrationForm);

  const isThereErrorInTheTextField = (step: number): boolean => {
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
          formValues.firstName.error ||
          formValues.middleName.error ||
          formValues.lastName.error
        )
          return true;
        if (formValues.firstName.value === "") formatsResponse(setFirstName);
        if (formValues.middleName.value === "") formatsResponse(setMiddleName);
        if (formValues.lastName.value === "") formatsResponse(setLastName);
        return isThereError;
      case 1:
        if (
          formValues.phoneNumber.error ||
          formValues.email.error ||
          formValues.city.error
        )
          return true;
        if (formValues.phoneNumber.value === "+7")
          formatsResponse(setPhoneNumber, "+7", "Укажите свой номер телефона");
        if (formValues.phoneNumber.value.length < 16)
          formatsResponse(
            setPhoneNumber,
            formValues.phoneNumber.value,
            "Номер телефона не может быть короче 11 цифер"
          );
        if (formValues.email.value === "") formatsResponse(setEmail);
        if (formValues.city.value === "") formatsResponse(setCity);
        return isThereError;
      case 2:
        if (formValues.tgToken.value === "") {
          isThereError = true;
          dispatch(
            setTgToken({
              value: "",
              error: true,
              text: "Поле не может быть пустым",
            })
          );
        }
        return isThereError;
      case 3:
        if (formValues.password.value === "") formatsResponse(setPassword);
        if (formValues.repeatPassword.value === "")
          formatsResponse(setRepeatPassword);
        if (formValues.repeatPassword.value !== formValues.password.value)
          formatsResponse(
            setRepeatPassword,
            formValues.repeatPassword.value,
            "Пароль не совпадает"
          );
        if (formValues.password.value.length < 6)
          formatsResponse(
            setPassword,
            formValues.password.value,
            "Пароль не может быть короче 6 символов"
          );
        if (!/[A-Z]/g.test(formValues.password.value))
          formatsResponse(
            setPassword,
            formValues.password.value,
            "Пароль должен содержать хотя бы одну заглавную букву"
          );
        if (!/[a-z]/g.test(formValues.password.value))
          formatsResponse(
            setPassword,
            formValues.password.value,
            "Пароль должен содержать хотя бы одну строчную букву"
          );
        if (!/[0-9]/g.test(formValues.password.value))
          formatsResponse(
            setPassword,
            formValues.password.value,
            "Пароль должен содержать хотя бы одну цифру"
          );
        return isThereError;
      default:
        console.error(`Не найдено совпадений для параметра ${step}`);
        return false;
    }
  };
  return { isThereErrorInTheTextField };
};
