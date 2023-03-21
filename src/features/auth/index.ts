import { useAppDispatch, useAppSelector } from "../../app/redux";
import { logIn } from "../../entities/auth/actions";
import { registrationFormSlice } from "../../entities/registration";
import { IRegistrationState } from "../../entities/registration/models";
import { formatsResponse } from "../../shared/helpers/formatsResponse";
import { useNavigate } from "react-router-dom";
import { getEmailAccordingToTheTemplate } from "../../pages/Registration/utils";

export const useAuth = () => {
  const formValues: IRegistrationState = useAppSelector(
    (state) => state.registrationForm
  );

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { setEmail, setPassword, reset } = registrationFormSlice.actions;

  const setEmailValue = (value: string) =>
    dispatch(setEmail(getEmailAccordingToTheTemplate(value)));

  const setPasswordValue = (value: string) =>
    dispatch(
      setPassword({
        value,
        error: formValues.data.password.error,
        text: formValues.data.password.errorText,
      })
    );

  const config = {
    fieldData: formValues.data.password,
    label: "Пароль",
    setValue: setPasswordValue,
  };

  const loginValue = formValues.data.email;

  const sendDate = () => {
    let isThereError: boolean = false;

    const { setEmail, setPassword } = registrationFormSlice.actions;

    const { email, password } = formValues.data;

    if (email.value === "") {
      dispatch(formatsResponse(setEmail));
      isThereError = true;
    }
    if (password.value === "") {
      dispatch(formatsResponse(setPassword));
      isThereError = true;
    }
    if (!isThereError) {
      dispatch(logIn(email.value, password.value, navigate));
    }
  };

  const goToForgetPassword = () => {
    dispatch(reset());
    navigate("/forgetPassword");
  };
  return { sendDate, setEmailValue, config, goToForgetPassword, loginValue };
};
