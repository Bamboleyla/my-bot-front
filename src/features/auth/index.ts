import { useAppDispatch, useAppSelector } from "../../app/redux";
import { registrationFormSlice } from "../../entities/registration";
import { IsValueAlreadyRegistered } from "../../entities/registration/actions";
import { IRegistrationState } from "../../entities/registration/models";
import { formatsResponse } from "../../shared/helpers/formatsResponse";

export const useAuth = () => {
  const formValues: IRegistrationState = useAppSelector(
    (state) => state.registrationForm
  );

  const dispatch = useAppDispatch();

  const sendDate = () => {
    let isThereError: boolean = false;

    const { setEmail, setPassword } = registrationFormSlice.actions;

    const login = formValues.data.email;
    const password = formValues.data.password;

    if (login.value === "") dispatch(formatsResponse(isThereError, setEmail));
    if (password.value === "")
      dispatch(formatsResponse(isThereError, setPassword));
    if (!isThereError) {
      dispatch(IsValueAlreadyRegistered(login.value, "isEmailRegistered"));
    }
  };
  return sendDate;
};
