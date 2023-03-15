import { useAppDispatch, useAppSelector } from "../../app/redux";
import { logIn } from "../../entities/auth/actions";
import { registrationFormSlice } from "../../entities/registration";
import { IsValueAlreadyRegistered } from "../../entities/registration/actions";
import { IRegistrationState } from "../../entities/registration/models";
import { formatsResponse } from "../../shared/helpers/formatsResponse";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const formValues: IRegistrationState = useAppSelector(
    (state) => state.registrationForm
  );

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const sendDate = () => {
    let isThereError: boolean = false;

    const { setEmail, setPassword } = registrationFormSlice.actions;

    const { email, password } = formValues.data;

    if (email.value === "") dispatch(formatsResponse(isThereError, setEmail));
    if (password.value === "")
      dispatch(formatsResponse(isThereError, setPassword));
    if (!isThereError) {
      dispatch(logIn(email.value, password.value, navigate));
    }
  };
  return sendDate;
};
