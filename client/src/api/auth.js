import { BASE_URL } from "../utils";
import axios from "axios";

export const auth = {
  login: (body) => axios.post(`${BASE_URL}/auth/login`, body),
  registration: (body) => axios.post(`${BASE_URL}/auth/signup`, body),
};
