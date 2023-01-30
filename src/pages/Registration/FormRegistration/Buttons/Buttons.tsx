import * as React from "react";
import styles from "./buttons.module.scss";
import { Button, Box, Typography } from "@mui/material";
import { useRegistration } from "../../useRegistration";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { steps } from "../../Registration";
import { registrationFormSlice } from "../../../../store/reducers/RegistrationFormSlice";

export const Buttons = () => {
  const { isThereErrorInTheTextField } = useRegistration();
  const { activeStep, isLoading } = useAppSelector(
    (state) => state.registrationForm
  );
  const { setActiveStep } = registrationFormSlice.actions;
  const dispatch = useAppDispatch();

  const getLoadingStatus = () => isLoading.length !== 0;

  return (
    <div className={styles.buttons}>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            Регистрация прошла успешно
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button
              disabled={getLoadingStatus()}
              onClick={() => dispatch(setActiveStep({ value: activeStep - 1 }))}
            >
              Назад
            </Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0 || getLoadingStatus()}
              onClick={() => dispatch(setActiveStep({ value: activeStep - 1 }))}
              sx={{ mr: 1 }}
            >
              Назад
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button
              disabled={getLoadingStatus()}
              onClick={() => isThereErrorInTheTextField(activeStep)}
            >
              {activeStep === steps.length - 1 ? "Отправить данные" : "Вперёд"}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </div>
  );
};
