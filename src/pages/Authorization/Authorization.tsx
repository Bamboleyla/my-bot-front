import * as React from "react";
import styles from "./authorization.module.scss";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Logo from "./bots.jpg";
import { PasswordField } from "./PasswordField";
import { LoginField } from "./LoginField";
import { useAuthorization } from "./useAuthorization";
import { useAppDispatch, useAppSelector } from "../../app/redux";
import { userAC } from "../../store/action_creators/userAC";
import { useNavigate } from "react-router-dom";

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

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { validationFields } = useAuthorization({ values, setValues });

  const { id } = useAppSelector((state) => state.userAuth);

  const validationForm = () => {
    const resultValidationFieldLogin = validationFields("login");
    const resultValidationFieldPassword = validationFields("password");

    if (
      resultValidationFieldLogin.length === 0 &&
      resultValidationFieldPassword.length === 0
    ) {
      dispatch(userAC(values.login, values.password));
    } else {
      setValues({
        ...values,
        errorsValidation: {
          login: resultValidationFieldLogin,
          password: resultValidationFieldPassword,
        },
      });
    }
  };

  React.useEffect(() => {
    if (id > 0) {
      navigate(`/office/${id}`, { replace: true });
    }
  }, [id, navigate]);

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
            <Button
              variant="contained"
              onClick={() => navigate(`/registration`, { replace: true })}
            >
              Регистрация
            </Button>
          </Stack>
        </div>
      </div>
    </div>
  );
};
