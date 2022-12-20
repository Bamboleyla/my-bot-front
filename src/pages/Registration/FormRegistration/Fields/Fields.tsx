import { InputAdornment } from "@mui/material";
import { Stack } from "@mui/system";
import { v4 as uuidv4 } from "uuid";
import { useAppDispatch } from "../../../../hooks/redux";
import { registrationFormSlice } from "../../../../store/reducers/RegistrationFormSlice";
import { Field } from "./Field/Field";
import { getPhoneNumberAccordingToTheTemplate } from "./fields.utils";

export const Fields = ({ activeStep }: { activeStep: number }) => {
  const dispatch = useAppDispatch();

  const setPhoneNumber = (inputValue: string, storePhoneNumber: string) =>
    dispatch(
      registrationFormSlice.actions.setPhoneNumber(
        getPhoneNumberAccordingToTheTemplate(inputValue, storePhoneNumber)
      )
    );

  const textFieldList = [
    [
      {
        label: "Фамилия",
        valueKey: "lastName",
        setValue: registrationFormSlice.actions.setLastName,
      },
      {
        label: "Имя",
        valueKey: "firstName",
        setValue: registrationFormSlice.actions.setFirstName,
      },
      {
        label: "Отчество",
        valueKey: "middleName",
        setValue: registrationFormSlice.actions.setMiddleName,
      },
    ],
    [
      {
        inputProps: {
          startAdornment: <InputAdornment position="start">+7</InputAdornment>,
        },
        label: "Телефон",
        setValue: setPhoneNumber,
        valueKey: "phoneNumber",
      },
      {
        label: "Email",
        valueKey: "email",
        setValue: registrationFormSlice.actions.setEmail,
      },
      {
        disabled: true,
        label: "Страна",
        valueKey: "country",
        setValue: registrationFormSlice.actions.setCountry,
      },
      {
        label: "Город",
        valueKey: "city",
        setValue: registrationFormSlice.actions.setCity,
      },
    ],
    [
      {
        label: "Номер Договора",
        valueKey: "contractNumber",
        setValue: registrationFormSlice.actions.setContractNumber,
      },
      {
        label: "Telegram Токен",
        valueKey: "tgToken",
        setValue: registrationFormSlice.actions.setTgToken,
      },
    ],
    [
      {
        label: "Логин",
        valueKey: "login",
        setValue: registrationFormSlice.actions.setLogin,
      },
      {
        label: "Пароль",
        valueKey: "password",
        setValue: registrationFormSlice.actions.setPassword,
      },
      {
        label: "Повторите пароль",
        valueKey: "repeatPassword",
        setValue: registrationFormSlice.actions.setRepeatPassword,
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
