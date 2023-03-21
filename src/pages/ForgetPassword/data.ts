import { useAppDispatch } from "../../app/redux";
import { registrationFormSlice } from "../../entities/registration";
import {
  getEmailAccordingToTheTemplate,
  getPasswordAccordingToTheTemplate,
} from "../Registration/utils";

export interface IgetFields {
  label: string;
  valueKey: string;
  setValue: any;
  disabled?: boolean;
}

export const useFields = (): (() => IgetFields[][]) => {
  const dispatch = useAppDispatch();

  const { setEmail, setPassword, setRepeatPassword, setEmailCode } =
    registrationFormSlice.actions;

  const getFields = (): IgetFields[][] => {
    return [
      [
        {
          label: "Email",
          valueKey: "email",
          setValue: (value: string) =>
            dispatch(setEmail(getEmailAccordingToTheTemplate(value))),
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
