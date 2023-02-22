import { IAuth } from "../../pages/Authorization/models";

export const validationFields = (values: IAuth, setValues: any): void => {
  const fieldsValues = { ...values };
  const newValue = {
    value: "",
    error: true,
    errorText: "Поле не может быть пустым",
  };
  if (values.login.error) fieldsValues.login.error = false;
  if (values.password.error) fieldsValues.password.error = false;

  if (values.login.value === "") fieldsValues.login = newValue;
  if (values.password.value === "") fieldsValues.password = newValue;
  setValues(fieldsValues);
};
