import { API } from "../base";
import { IsValueAlreadyRegistered } from "./models";

export const isEmailAlreadyRegistered = (data: { email: string }) =>
  API.post<IsValueAlreadyRegistered>("/api/checkEmail", data);

export const isPhoneNumberAlreadyRegistered = (data: { phone: string }) =>
  API.post<IsValueAlreadyRegistered>("/api/checkPhone", data);

export const isTgTokenAlreadyRegistered = (data: { token: string }) =>
  API.post<IsValueAlreadyRegistered>("/api/checkTokenTG", data);
