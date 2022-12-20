import * as React from "react";
import styles from "./buttons.module.scss";
import { Button, Box, Typography } from "@mui/material";
import { FormRegistrationType } from "../FormRegistration";

export const Buttons = ({
  activeStep,
  setActiveStep,
  steps,
}: FormRegistrationType) => {
  return (
    <div className={styles.buttons}>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={() => setActiveStep(0)}>Отмена</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={() =>
                setActiveStep((prevActiveStep) => prevActiveStep - 1)
              }
              sx={{ mr: 1 }}
            >
              Назад
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button
              onClick={() =>
                setActiveStep((prevActiveStep) => prevActiveStep + 1)
              }
            >
              {activeStep === steps.length - 1 ? "Отправить данные" : "Вперёд"}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </div>
  );
};
