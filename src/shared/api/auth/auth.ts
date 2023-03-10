import { API } from "../base";

export const logIn = (data: { email: string; password: string }) =>
  API.post("/api/login", data);
