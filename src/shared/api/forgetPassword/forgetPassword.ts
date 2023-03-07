import { API } from "../base";

export const sendСodeToEmail = (data: { email: string }) =>
  API.post("/api/sendCodeToEmail", data);

export const changePassword = (data: {
  email: string;
  code: string;
  password: string;
}) => API.post("/api/changePassword", data);
