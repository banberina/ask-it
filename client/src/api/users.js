import { BASE_URL, getHeaders } from "../utils/utils";
import axios from "axios";
import helpers from "../utils/helpers";

const users = {
  getMostActiveUsers: () => axios.get(`${BASE_URL}/users/mostactive`),

  getOneUser: (userKey) =>
    axios.get(`${BASE_URL}/users/${userKey}`, {
      headers: getHeaders(),
    }),

  changeName: (userKey, body) =>
    axios.put(`${BASE_URL}/users/modifyname/${userKey}`, body, {
      headers: { "Authorization": helpers.getToken() },
    }),

  changeSurname: (userKey, body) =>
    axios.put(`${BASE_URL}/users/modifysurname/${userKey}`, body, {
      headers: { "Authorization": helpers.getToken() },
    }),

  changeEmail: (userKey, body) =>
    axios.put(`${BASE_URL}/users/modifyemail/${userKey}`, body, {
      headers: { "Authorization": helpers.getToken() },
    }),

  changePassword: (userKey, body) =>
    axios.put(`${BASE_URL}/users/modifypassword/${userKey}`, body, {
      headers: { "Authorization": helpers.getToken() },
    }),
};

export default users;