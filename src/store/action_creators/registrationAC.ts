import { isEmailAlreadyRegisteredAPI } from "../../api/api";
import { registrationFormSlice } from "../reducers/RegistrationFormSlice";
import { AppDispatch } from "../store";

export const isEmailAlreadyRegistered =
  (email: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(registrationFormSlice.actions.setLoading({ value: true }));
      const { data } = await isEmailAlreadyRegisteredAPI({ email });

      if (!data.success)
        dispatch(
          registrationFormSlice.actions.setEmail({
            value: email,
            error: true,
            text: data.message,
          })
        );
      dispatch(registrationFormSlice.actions.setLoading({ value: false }));
    } catch (error: any) {
      console.error(error);
    }
  };
