import styles from "./progressRegistration.module.scss";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { useAppSelector } from "../../../hooks/redux";
import { steps } from "../Registration";

export const ProgressRegistration = () => {
  const { activeStep } = useAppSelector((state) => state.registrationForm);
  return (
    <div className={styles.progress}>
      <Box sx={{ width: "100%" }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label) => {
            const stepProps: { completed?: boolean } = {};
            return (
              <Step key={label} {...stepProps}>
                <StepLabel>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </Box>
    </div>
  );
};
