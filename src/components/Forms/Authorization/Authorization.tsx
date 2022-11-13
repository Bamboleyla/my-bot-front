import * as React from "react";
import styles from "./authorization.module.scss";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Logo from "./bots.jpg";
import { PasswordField } from "./PasswordField";
import { LoginField } from "./LoginField";
import { useAuthorization } from "../../../hooks/useAuthorization";

export interface State {
  login: string;
  password: string;
  showPassword: boolean;
  errorsValidation: { login: string[]; password: string[] };
}

export const Authorization = () => {
  const [values, setValues] = React.useState<State>({
    login: "",
    password: "",
    showPassword: false,
    errorsValidation: { login: [], password: [] },
  });

  const { validationFields } = useAuthorization({ values, setValues });

  const validationForm = () => {
    const resultValidationFieldLogin = validationFields("login");
    const resultValidationFieldPassword = validationFields("password");

    setValues({
      ...values,
      errorsValidation: {
        login: resultValidationFieldLogin,
        password: resultValidationFieldPassword,
      },
    });
  };

  return (
    <div className={styles.form}>
      <img src={Logo} alt="logo" />
      <div className={styles.wrap}>
        <Stack>
          <LoginField values={values} setValues={setValues} />
          <PasswordField values={values} setValues={setValues} />
        </Stack>
        <div className={styles.buttons}>
          <Stack spacing={2} direction="row">
            <Button variant="contained" onClick={validationForm}>
              Вход
            </Button>
            <Button variant="contained">Регистрация</Button>
          </Stack>
        </div>
      </div>
    </div>
  );
};
