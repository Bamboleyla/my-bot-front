import styles from "./styles.module.scss";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Logo from "./public/bots.jpg";
import { PasswordField } from "./components/PasswordField";
import { LoginField } from "./components/LoginField";
import { useAppDispatch, useAppSelector } from "../../app/redux";
import { userAC } from "../../entities/user/actions";
import { useNavigate } from "react-router-dom";
import { IAuth } from "./models";
import { useEffect, useState } from "react";

export const Authorization = () => {
  const [values, setValues] = useState<IAuth>({
    login: "",
    password: "",
    showPassword: false,
    errorsValidation: { login: [], password: [] },
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { id } = useAppSelector((state) => state.userAuth);

  const validationFields = (field: "login" | "password"): string[] => {
    const isFieldEmpty = (text: string): boolean => text === "";

    const validationResults = [];
    if (isFieldEmpty(values[field])) {
      validationResults.push("Поле не может быть пустым");
    }
    return validationResults;
  };

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

  useEffect(() => {
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
