import { AppDispatch } from "../store";
import { Api } from "../../shared/api/index";
import { registrationFormSlice } from "../registration";
import { NavigateFunction } from "react-router-dom";
import { notification } from "antd";

export const logIn =
  (email: string, password: string, navigate: NavigateFunction) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(
        registrationFormSlice.actions.addLoadingProcess({
          value: "logIn",
        })
      );
      const { status, data } = await Api.auth.logIn({ email, password });
      if (status === 200) {
        dispatch(registrationFormSlice.actions.reset());
        navigate("/main");
      } else if (status === 400) {
        notification.info({
          message: "Ошибка авторизации",
          description: data.message,
          placement: "topLeft",
        });
      }
      dispatch(
        registrationFormSlice.actions.deleteLoadingProcess({
          value: "logIn",
        })
      );
    } catch (error: any) {
      console.error(error);
    }
  };
