import { useAppDispatch } from "../../app/redux";
import { registrationFormSlice } from "../../entities/registration";
import {
  getCyrillicStringAccordingToTheTemplate,
  getPhoneNumberAccordingToTheTemplate,
  getEmailAccordingToTheTemplate,
  getPasswordAccordingToTheTemplate,
} from "../ForgetPassword/utils";

export interface IgetFields {
  label: string;
  valueKey: string;
  setValue: any;
  disabled?: boolean;
}

export const useFields = () => {
  const dispatch = useAppDispatch();

  const {
    setLastName,
    setFirstName,
    setMiddleName,
    setPhoneNumber,
    setEmail,
    setCountry,
    setCity,
    setTgToken,
    setPassword,
    setRepeatPassword,
    setEmailCode,
  } = registrationFormSlice.actions;

  const getFields = (): IgetFields[][] => {
    return [
      [
        {
          label: "Фамилия",
          valueKey: "lastName",
          setValue: (value: string) =>
            dispatch(
              setLastName(getCyrillicStringAccordingToTheTemplate(value))
            ),
        },
        {
          label: "Имя",
          valueKey: "firstName",
          setValue: (value: string) =>
            dispatch(
              setFirstName(getCyrillicStringAccordingToTheTemplate(value))
            ),
        },
        {
          label: "Отчество",
          valueKey: "middleName",
          setValue: (value: string) =>
            dispatch(
              setMiddleName(getCyrillicStringAccordingToTheTemplate(value))
            ),
        },
      ],
      [
        {
          label: "Телефон",
          valueKey: "phoneNumber",
          setValue: (value: string, storePhoneNumber: string) =>
            dispatch(
              setPhoneNumber(
                getPhoneNumberAccordingToTheTemplate(value, storePhoneNumber)
              )
            ),
        },
        {
          label: "Email",
          valueKey: "email",
          setValue: (value: string) =>
            dispatch(setEmail(getEmailAccordingToTheTemplate(value))),
        },
        {
          disabled: true,
          label: "Страна",
          valueKey: "country",
          setValue: setCountry,
        },
        {
          label: "Город",
          valueKey: "city",
          setValue: (value: string) =>
            dispatch(setCity(getCyrillicStringAccordingToTheTemplate(value))),
        },
      ],
      [
        {
          label: "Telegram Токен",
          valueKey: "tgToken",
          setValue: (value: string) =>
            dispatch(setTgToken({ value, error: false, text: "" })),
        },
      ],
      [
        {
          label: "Пароль",
          valueKey: "password",
          setValue: (value: string) =>
            dispatch(setPassword(getPasswordAccordingToTheTemplate(value))),
        },
        {
          label: "Повторите пароль",
          valueKey: "repeatPassword",
          setValue: (value: string) =>
            dispatch(
              setRepeatPassword(getPasswordAccordingToTheTemplate(value))
            ),
        },
      ],
      [
        {
          label: "Введите код",
          valueKey: "emailCode",
          setValue: (value: string) =>
            dispatch(setEmailCode({ value, error: false, text: "" })),
        },
      ],
    ];
  };
  return getFields;
};
