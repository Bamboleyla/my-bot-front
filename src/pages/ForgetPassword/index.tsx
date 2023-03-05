import { Progress } from "../../shared/ui/Progress";
import styles from "./styles.module.scss";
import { useState } from "react";
import { FormRegistration } from "../../shared/ui/FormRegistration";
import { data } from "./data";
import { IformValues } from "../../shared/ui/FormRegistration/components/Field/models";

export const steps = ["Шаг1", "Шаг2", "Шаг3"];

const Title = () => <div className={styles.title}>Восстановление пароля</div>;

export const ForgetPassword = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  // const [formValues, setformValues] = useState<IformValues>(data);
  return (
    <div className={styles.forgetPassword}>
      <Progress steps={steps} activeStep={activeStep} />
      <div className={styles.form}>
        {activeStep !== steps.length && <Title />}
        {/* <FormRegistration formValues={formValues} /> */}
      </div>
    </div>
  );
};
