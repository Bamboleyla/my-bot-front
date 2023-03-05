import styles from "./styles.module.scss";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Logo from "./public/bots.jpg";
import { LoginField } from "./components/LoginField";
import { useNavigate } from "react-router-dom";
import { IAuth } from "./models";
import { useState } from "react";
import { validationFields } from "../../features/auth";
import { PasswordField } from "../../shared/ui/PasswordField";

export const Authorization = () => {
  const [values, setValues] = useState<IAuth>({
    login: { value: "", error: false, errorText: "" },
    password: { value: "", error: false, errorText: "" },
    isLoading: [],
  });

  const navigate = useNavigate();

  const setValue = (value: string) =>
    setValues({ ...values, password: { ...values.password, value } });

  const config = {
    fieldData: values.password,
    label: "Пароль",
    setValue,
  };

  return (
    <div className={styles.form}>
      <img src={Logo} alt="logo" />
      <div className={styles.wrap}>
        <Stack>
          <LoginField values={values} setValues={setValues} />
          <PasswordField config={config} />
        </Stack>
        <div className={styles.buttons}>
          <Stack spacing={2} direction="row">
            <Button
              variant="contained"
              onClick={() => validationFields(values, setValues)}
            >
              Вход
            </Button>
            <Button
              variant="contained"
              onClick={() => navigate(`/registration`)}
            >
              Регистрация
            </Button>
          </Stack>
          <div
            className={styles.forget}
            onClick={() => navigate("/forgetPassword")}
          >
            Забыли пароль?
          </div>
        </div>
      </div>
    </div>
  );
};
