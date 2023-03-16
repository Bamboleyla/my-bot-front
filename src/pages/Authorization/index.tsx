import styles from "./styles.module.scss";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Logo from "./public/bots.jpg";
import { LoginField } from "./components/LoginField";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../features/auth";
import { PasswordField } from "../../shared/ui/PasswordField";
import { getEmailAccordingToTheTemplate } from "../ForgetPassword/utils";
import { useAppDispatch, useAppSelector } from "../../app/redux";
import { registrationFormSlice } from "../../entities/registration";
import { IRegistrationState } from "../../entities/registration/models";
import { Box } from "@mui/system";

export const Authorization = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const sendDate = useAuth();

  const { setEmail, setPassword, reset } = registrationFormSlice.actions;
  const formValues: IRegistrationState = useAppSelector(
    (state) => state.registrationForm
  );

  const setEmailValue = (value: string) =>
    dispatch(setEmail(getEmailAccordingToTheTemplate(value)));

  const setPasswordValue = (value: string) =>
    dispatch(
      setPassword({
        value,
        error: formValues.data.password.error,
        text: formValues.data.password.errorText,
      })
    );

  const config = {
    fieldData: formValues.data.password,
    label: "Пароль",
    setValue: setPasswordValue,
  };

  return (
    <div className={styles.form}>
      <img src={Logo} alt="logo" />
      <div className={styles.wrap}>
        <Box sx={{ width: "40ch" }}>
          <Stack spacing={2}>
            <LoginField
              values={formValues.data.email}
              setValues={setEmailValue}
            />
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
            <div
              className={styles.forget}
              onClick={() => {
                dispatch(reset());
                navigate("/forgetPassword");
              }}
            >
              Забыли пароль?
            </div>
          </div>
        </Box>
      </div>
    </div>
  );
};
