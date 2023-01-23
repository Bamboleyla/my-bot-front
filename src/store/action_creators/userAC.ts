import { AppDispatch } from "./../store";
import { authUserAPI } from "../../api/api";
import { userSlice } from "../reducers/UserSlice";

export const userAC =
  (login: string, password: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(userSlice.actions.userAuth());
      const response = await authUserAPI({ login, password });
      dispatch(userSlice.actions.userAuthSuccess({ ...response.data }));
    } catch (error: any) {
      dispatch(userSlice.actions.userAuthError(error.message));
    }
  };
