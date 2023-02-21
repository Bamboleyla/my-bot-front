import { AppDispatch } from "../../entities/store";
// import { authUserAPI } from "../../shared/api/api";
import { userSlice } from "../reducers/UserSlice";

export const userAC =
  (login: string, password: string) => async (dispatch: AppDispatch) => {
    try {
      // dispatch(userSlice.actions.userAuth());
      // const response = await authUserAPI({ login, password });
      // dispatch(userSlice.actions.userAuthSuccess({ ...response.data }));
      console.log("TODO");
    } catch (error: any) {
      dispatch(userSlice.actions.userAuthError(error.message));
    }
  };
