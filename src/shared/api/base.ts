import axios from "axios";
import { baseURL } from "../config/index";

export const API = axios.create({
  baseURL,
  validateStatus: (status) => {
    return status >= 200 && status < 500;
  },
});
