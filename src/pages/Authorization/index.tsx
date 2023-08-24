import styles from "./styles.module.scss";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Logo from "./public/bots.jpg";
import { LoginField } from "./components/LoginField";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../features/auth";
import { PasswordField } from "../../shared/components/PasswordField";
import { Box } from "@mui/system";

export const Authorization = () => {
  const navigate = useNavigate();

  const { sendDate, setEmailValue, config, goToForgetPassword, loginValue } =
    useAuth();

  return (
    <div className={styles.form} data-testid={"Authorization"}>
      <img src={Logo} alt="logo" />
      <div className={styles.wrap}>
        <Box sx={{ width: "40ch" }}>
          <Stack spacing={2}>
            <LoginField values={loginValue} setValues={setEmailValue} />
            <PasswordField config={config} />
          </Stack>

          <div className={styles.buttons}>
            <Stack spacing={2} direction="row">
              <Button variant="contained" onClick={sendDate}>
                Вход
              </Button>
              <Button
                variant="contained"
                onClick={() => navigate(`/registration`)}
              >
                Регистрация
              </Button>
            </Stack>
            <div className={styles.forget} onClick={goToForgetPassword}>
              Забыли пароль?
            </div>
          </div>
        </Box>
      </div>
    </div>
  );
};
