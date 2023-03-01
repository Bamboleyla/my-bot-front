import { API } from "../base";
import { IResponse, IUserDataReq, IUserDataRes } from "./models";

export const isEmailAlreadyRegistered = (data: { email: string }) =>
  API.post<IResponse>("/api/checkEmail", data);

export const isPhoneNumberAlreadyRegistered = (data: { phone: string }) =>
  API.post<IResponse>("/api/checkPhone", data);

export const isTgTokenAlreadyRegistered = (data: { token: string }) =>
  API.post<IResponse>("/api/checkTokenTG", data);

export const registerNewUser = (data: IUserDataReq) =>
  API.post<IUserDataRes>("/api/registration", data);

export const chekEmailCode = (data: { code: string }) =>
  API.post<IResponse>("/api/emailCode", data);
