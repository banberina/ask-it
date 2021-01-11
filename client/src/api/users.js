import { BASE_URL, getHeaders } from "../utils";
import axios from "./axios";

export const users = {
  getMostActiveUsers: () => axios.get(`${BASE_URL}/users/mostactive`),

  getOneUser: (userKey) =>
    axios.get(`${BASE_URL}/users/${userKey}`, {
      headers: getHeaders(),
    }),

  changeName: (userKey, body) =>
    axios.put(`${BASE_URL}/users/modifyname/${userKey}`, body, {
      headers: getHeaders(),
    }),

  changeSurname: (userKey, body) =>
    axios.put(`${BASE_URL}/users/modifysurname/${userKey}`, body, {
      headers: getHeaders(),
    }),

  changeEmail: (userKey, body) =>
    axios.put(`${BASE_URL}/users/modifyemail/${userKey}`, body, {
      headers: getHeaders(),
    }),

  changePassword: (userKey, body) =>
    axios.put(`${BASE_URL}/users/modifypassword/${userKey}`, body, {
      headers: getHeaders(),
    }),
};
