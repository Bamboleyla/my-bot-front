import { registrationFormSlice } from ".";
import { AppDispatch } from "../store";
import { Api } from "../../shared/api/index";
import { NavigateFunction } from "react-router-dom";

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
        message: string,
        action: IsetEmail | IsetPhoneNumber | IsetTgToken
      ) =>
        dispatch(
          action({
            value,
            error: true,
            text: message,
          })
        );

      switch (process) {
        // Используется при регистрации, когда важно что-бы email не был зарегестрирован
        case "IsThisEmailFree":
          const responseEmail = await Api.registration.isEmailAlreadyRegistered(
            {
              email: value,
            }
          );
          responseEmail.data &&
            registeringResponse("Данный email уже зарегистрирован", setEmail);
          break;
        // Используется при сбросе пароля, когда важно, что-бы email уже был зарегестрирован
        case "isEmailRegistered":
          const response = await Api.registration.isEmailAlreadyRegistered({
            email: value,
          });
          !response.data &&
            registeringResponse("Данный email не зарегистрирован", setEmail);
          break;
        case "isPhoneNumberAlreadyRegistered":
          const responsePhone =
            await Api.registration.isPhoneNumberAlreadyRegistered({
              phone: value,
            });
          responsePhone.data &&
            registeringResponse(
              "Данный номер телефона уже зарегистрирован",
              setPhoneNumber
            );
          break;
        case "isTokenTgAlreadyRegistered":
          const responseToken =
            await Api.registration.isTgTokenAlreadyRegistered({
              token: value,
            });
          responseToken.data &&
            registeringResponse(
              "Данный telegram token уже зарегистрирован",
              setTgToken
            );
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

export const ChekEmailCode =
  (email: string, code: string, navigate: NavigateFunction) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(
        registrationFormSlice.actions.addLoadingProcess({
          value: "ChekEmailCode",
        })
      );
      const { data } = await Api.registration.chekEmailCode({
        email,
        code,
      });
      if (!data.success)
        dispatch(
          registrationFormSlice.actions.setEmailCode({
            value: code,
            error: true,
            text: data.message,
          })
        );
      else navigate("/main");
      dispatch(
        registrationFormSlice.actions.deleteLoadingProcess({
          value: "ChekEmailCode",
        })
      );
    } catch (error: any) {
      console.error(error);
    }
  };
