import { registrationFormSlice } from ".";
import { AppDispatch } from "../store";
import { Api } from "../../shared/api/index";

const { setEmail, setPhoneNumber, setTgToken } = registrationFormSlice.actions;

type IsetEmail = typeof setEmail;
type IsetPhoneNumber = typeof setPhoneNumber;
type IsetTgToken = typeof setTgToken;

export const IsValueAlreadyRegistered =
  (value: string, process: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(
        registrationFormSlice.actions.addLoadingProcess({
          value: process,
        })
      );

      const registeringResponse = (
        data: { message: string },
        action: IsetEmail | IsetPhoneNumber | IsetTgToken
      ) =>
        dispatch(
          action({
            value,
            error: true,
            text: data.message,
          })
        );

      switch (process) {
        case "isEmailAlreadyRegistered":
          const responseEmail = await Api.registration.isEmailAlreadyRegistered(
            {
              email: value,
            }
          );
          !responseEmail.data.success &&
            registeringResponse(responseEmail.data, setEmail);
          break;
        case "isPhoneNumberAlreadyRegistered":
          const responsePhone =
            await Api.registration.isPhoneNumberAlreadyRegistered({
              phone: value,
            });
          !responsePhone.data.success &&
            registeringResponse(responsePhone.data, setPhoneNumber);
          break;
        case "isTokenTgAlreadyRegistered":
          const responseToken =
            await Api.registration.isTgTokenAlreadyRegistered({
              token: value,
            });
          !responseToken.data.success &&
            registeringResponse(responseToken.data, setTgToken);
          break;
        default:
          console.error(`Для process: ${process} сценарий неопределен`);
          break;
      }

      dispatch(
        registrationFormSlice.actions.deleteLoadingProcess({
          value: process,
        })
      );
    } catch (error: any) {
      console.error(error);
    }
  };
