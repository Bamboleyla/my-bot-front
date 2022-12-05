import { AppDispatch } from "./../store";
import { authUserAPI } from "../../api/api";
import { userSlice } from "../reducers/UserSlice";

export const userAC =
  (login: string, password: string) => async (dicpatch: AppDispatch) => {
    try {
      dicpatch(userSlice.actions.userAuth());
      const response = await authUserAPI({ login, password });
      dicpatch(userSlice.actions.userAuthSuccess({ ...response.data }));
    } catch (error: any) {
      dicpatch(userSlice.actions.userAuthError(error.message));
    }
  };
