import styles from "./styles.module.scss";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Logo from "./public/bots.jpg";
import { PasswordField } from "./components/PasswordField";
import { LoginField } from "./components/LoginField";
import { useAppSelector } from "../../app/redux";
import { useNavigate } from "react-router-dom";
import { IAuth } from "./models";
import { useEffect, useState } from "react";
import { validationFields } from "../../features/auth";

export const Authorization = () => {
  const { id } = useAppSelector((state) => state.userAuth);

  const [values, setValues] = useState<IAuth>({
    login: { value: "", error: false, errorText: "" },
    password: { value: "", error: false, errorText: "" },
    isLoading: [],
  });

  const navigate = useNavigate();

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
            <Button
              variant="contained"
              onClick={() => validationFields(values, setValues)}
            >
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
