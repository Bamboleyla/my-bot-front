import styles from "./styles.module.scss";
import { ProgressRegistration } from "./components/ProgressRegistration";
import { useAppSelector } from "../../app/redux";
import FormRegistration from "../../widgets/FormRegistration";

export const steps = ["Шаг1", "Шаг2", "Шаг3", "Шаг4", "Шаг5"];

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
