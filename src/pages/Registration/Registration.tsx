import styles from "./registration.module.scss";
import * as React from "react";
import { ProgressRegistration } from "./ProgressRegistration/ProgressRegistration";
import { FormRegistration } from "./FormRegistration/FormRegistration";

export const Registration = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  return (
    <div className={styles.form}>
      <ProgressRegistration
        activeStep={activeStep}
        setActiveStep={setActiveStep}
      />
      <FormRegistration activeStep={activeStep} />
    </div>
  );
};
