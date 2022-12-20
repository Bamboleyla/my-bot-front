import styles from "./registration.module.scss";
import * as React from "react";
import { ProgressRegistration } from "./ProgressRegistration/ProgressRegistration";
import { FormRegistration } from "./FormRegistration/FormRegistration";

const steps = ["Шаг1", "Шаг2", "Шаг3", "Шаг4"];

export const Registration = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  return (
    <div className={styles.body}>
      <ProgressRegistration activeStep={activeStep} steps={steps} />
      <div className={styles.form}>
        {activeStep !== steps.length && (
          <div className={styles.title}>Регистрация</div>
        )}
        <FormRegistration
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          steps={steps}
        />
      </div>
    </div>
  );
};
