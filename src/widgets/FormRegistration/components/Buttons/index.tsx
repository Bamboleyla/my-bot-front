import * as React from "react";
import styles from "./styles.module.scss";
import { Button, Box } from "@mui/material";
import { useRegistration } from "../../../../features/registration/hook";

export const Buttons = () => {
  const { nextStep, getLoadingStatus, previousStep, getButtonTitle } =
    useRegistration();

  return (
    <div className={styles.buttons}>
      <React.Fragment>
        <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
          <Button
            color="inherit"
            disabled={getLoadingStatus()}
            onClick={previousStep}
            sx={{ mr: 1 }}
          >
            Назад
          </Button>
          <Box sx={{ flex: "1 1 auto" }} />
          <Button disabled={getLoadingStatus()} onClick={nextStep}>
            {getButtonTitle()}
          </Button>
        </Box>
      </React.Fragment>
    </div>
  );
};
