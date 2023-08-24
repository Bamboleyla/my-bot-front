import { Progress } from "../../shared/components/Progress";
import styles from "./styles.module.scss";
import { useFields } from "./data";
import { useAppSelector } from "../../app/redux";
import { IRegistrationState } from "../../entities/registration/models";
import { useForgetPassword } from "../../features/forgetPassword";
import { FormRegistration } from "../../widgets/FormRegistration";

export const steps = ["Шаг1", "Шаг2", "Шаг3"];

const Title = () => <div className={styles.title}>Восстановление пароля</div>;

export const ForgetPassword = () => {
  const formValues: IRegistrationState = useAppSelector(
    (state) => state.registrationForm
  );
  const getFields = useFields();

  const display = useForgetPassword();

  return (
    <div className={styles.forgetPassword} data-testid={"ForgetPassword"}>
      <Progress steps={steps} activeStep={formValues.activeStep} />
      <div className={styles.form}>
        <Title />
        <FormRegistration
          formValues={formValues}
          config={getFields()}
          display={display}
        />
      </div>
    </div>
  );
};
