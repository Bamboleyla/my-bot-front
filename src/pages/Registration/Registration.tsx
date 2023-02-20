import styles from "./registration.module.scss";
import { ProgressRegistration } from "../../shared/ui/ProgressRegistration";
import FormRegistration from "./FormRegistration/FormRegistration";
import { useAppSelector } from "../../hooks/redux";

export const steps = ["Шаг1", "Шаг2", "Шаг3", "Шаг4"];

const Title = () => <div className={styles.title}>Регистрация</div>;

export const Registration = () => {
  const { activeStep } = useAppSelector((state) => state.registrationForm);

  return (
    <div className={styles.body}>
      <ProgressRegistration steps={steps} activeStep={activeStep} />
      <div className={styles.form}>
        {activeStep !== steps.length && <Title />}
        <FormRegistration />
      </div>
    </div>
  );
};
