import { IAuth } from "../../pages/Authorization/models";

export const validationFields = (values: IAuth, setValues: any): void => {
  const value = {
    value: "",
    error: true,
    errorText: "Поле не может быть пустым",
  };
  if (values.login.value === "")
    setValues({
      ...values,
      login: value,
    });
  if (values.password.value === "")
    setValues({
      ...values,
      password: value,
    });
};
