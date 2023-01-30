import { Stack } from "@mui/system";
import { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { registrationFormSlice } from "../../../../store/reducers/RegistrationFormSlice";
import { Field } from "./Field/Field";
import {
  getCyrillicStringAccordingToTheTemplate,
  getPhoneNumberAccordingToTheTemplate,
  getEmailAccordingToTheTemplate,
  getPasswordAccordingToTheTemplate,
} from "./fields.utils";
import { FieldsSkeleton } from "./FieldsSkeleton";

export const Fields = () => {
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

  const { activeStep, isLoading } = useAppSelector(
    (state) => state.registrationForm
  );

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

  const fields = useMemo(
    () =>
      textFieldList[activeStep].map((field, index) => (
        <Field {...field} key={index} />
      )),
    [activeStep]
  );

  return (
    <Stack spacing={2}>
      {isLoading.length === 0 ? fields : <FieldsSkeleton />}
    </Stack>
  );
};
