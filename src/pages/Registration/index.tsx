import styles from "./styles.module.scss";
import { Progress } from "../../shared/ui/Progress";
import { useAppSelector } from "../../app/redux";
import { IRegistrationState } from "../../entities/registration/models";
import { FormRegistration } from "../../shared/ui/FormRegistration";
import { useFields } from "./data";
import { useRegistration } from "../../features/registration";

export const steps = ["Шаг1", "Шаг2", "Шаг3", "Шаг4", "Шаг5"];

const Title = () => <div className={styles.title}>Регистрация</div>;

export const Registration = () => {
  const formValues: IRegistrationState = useAppSelector(
    (state) => state.registrationForm
  );

  const getFields = useFields();

  const display = useRegistration();

  return (
    <div className={styles.registration} data-testid={"Registration"}>
      <Progress steps={steps} activeStep={formValues.activeStep} />
      <div className={styles.form}>
        {formValues.activeStep !== steps.length && <Title />}
        <FormRegistration
          formValues={formValues}
          config={getFields()}
          display={display}
        />
      </div>
    </div>
  );
};
