import { NavigateFunction } from "react-router-dom";
import { AppDispatch } from "../store";
import { Api } from "../../shared/api/index";
import { notification } from "antd";
import { registrationFormSlice } from "../registration";

export const sendСodeToEmail =
  (email: { email: string }) => async (dispatch: AppDispatch) => {
    try {
      dispatch(
        registrationFormSlice.actions.addLoadingProcess({
          value: "sendСodeToEmail",
        })
      );
      const { status } = await Api.forgetPassword.sendСodeToEmail(email);

      if (status === 200) {
        let message = "Новое Письмо!";
        let description = `Вам на ваш почтовый ящик ${email.email} выслано письмо с кодом активации акаунта`;
        notification.info({ message, description, placement: "topLeft" });
      } else console.error(`Для status: ${status} неопределен сценарий`);
      dispatch(
        registrationFormSlice.actions.deleteLoadingProcess({
          value: "sendСodeToEmail",
        })
      );
    } catch (error: any) {
      console.error(error);
    }
  };

export const changePassword =
  (
    data: { email: string; code: string; password: string },
    navigate: NavigateFunction
  ) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(
        registrationFormSlice.actions.addLoadingProcess({
          value: "changePassword",
        })
      );
      const { status } = await Api.forgetPassword.changePassword(data);
      if (status === 200) {
        let message = "Действие выполнено!";
        let description = `Пароль от  ${data.email} был успешно изменен`;
        notification.info({ message, description, placement: "topLeft" });
        dispatch(registrationFormSlice.actions.reset());
        navigate("/main");
      } else if (status === 400)
        dispatch(
          registrationFormSlice.actions.setEmailCode({
            value: data.code,
            error: true,
            text: "Неверный код",
          })
        );
      else console.error(`Для status: ${status} неопределен сценарий`);
      dispatch(
        registrationFormSlice.actions.deleteLoadingProcess({
          value: "changePassword",
        })
      );
    } catch (error: any) {
      console.error(error);
    }
  };
