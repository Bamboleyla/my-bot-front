import { Stack } from "@mui/system";
import { v4 as uuidv4 } from "uuid";
import { useAppDispatch } from "../../../../hooks/redux";
import { registrationFormSlice } from "../../../../store/reducers/RegistrationFormSlice";
import { Field } from "./Field/Field";
import {
  getCyrillicStringAccordingToTheTemplate,
  getPhoneNumberAccordingToTheTemplate,
  getEmailAccordingToTheTemplate,
  getPasswordAccordingToTheTemplate,
} from "./fields.utils";

export const Fields = ({ activeStep }: { activeStep: number }) => {
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
  } = registrationFormSlice.actions;

  const textFieldList = [
    [
      {
        label: "Фамилия",
        valueKey: "lastName",
        setValue: (value: string) =>
          dispatch(setLastName(getCyrillicStringAccordingToTheTemplate(value))),
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
          dispatch(setRepeatPassword(getPasswordAccordingToTheTemplate(value))),
      },
    ],
    [],
  ];

  return (
    <Stack spacing={2}>
      {textFieldList[activeStep].map((field) => (
        <Field {...field} key={uuidv4()} />
      ))}
    </Stack>
  );
};
