import styles from "./styles.module.scss";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

interface Props {
  steps: string[];
  activeStep: number;
}

export const Progress = ({ steps, activeStep }: Props) => {
  return (
    <div className={styles.progress} data-testid="progress">
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
