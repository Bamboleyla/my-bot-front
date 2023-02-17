import axios from "axios";
import { baseURL } from "../config/index";

export const API = axios.create({
  baseURL,
});
