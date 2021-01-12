import { BASE_URL } from "../utils/utils";
import axios from "axios";

const auth = {
  login: (body) => axios.post(`${BASE_URL}/auth/login`, body),
  registration: (body) => axios.post(`${BASE_URL}/auth/signup`, body),
};

export default auth;