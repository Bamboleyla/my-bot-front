import axios from "axios";
import { baseURL } from "./config";

const API = axios.create({
  baseURL,
});

// AUTH
export const authUserAPI = (data: { login: string; password: string }) =>
  API.post("/api/auth", data);
// REGISTRATION
export interface IsValueAlreadyRegistered {
  success: boolean;
  message: string;
}

export const isEmailAlreadyRegisteredAPI = (data: { email: string }) =>
  API.post<IsValueAlreadyRegistered>("/api/checkEmail", data);

export const isPhoneNumberAlreadyRegisteredAPI = (data: { phone: string }) =>
  API.post<IsValueAlreadyRegistered>("/api/checkPhone", data);

export const isTgTokenAlreadyRegisteredAPI = (data: { token: string }) =>
  API.post<IsValueAlreadyRegistered>("/api/checkTokenTG", data);
