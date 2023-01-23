import axios from "axios";
import { baseURL } from "./config";

const API = axios.create({
  baseURL,
});

// AUTH
export const authUserAPI = (data: { login: string; password: string }) =>
  API.post("/api/auth", data);
// REGISTRATION
interface IsEmailAlreadyRegistered {
  success: boolean;
  message: string;
}
export const isEmailAlreadyRegisteredAPI = (data: { email: string }) =>
  API.post<IsEmailAlreadyRegistered>("/api/checkEmail", data);
