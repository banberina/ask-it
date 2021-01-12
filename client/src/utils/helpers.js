import jwt_decode from "jwt-decode";

const helpers = {
  setToken: (token) => {
    window.localStorage.setItem("jwt", token);
  },

  getToken: () => {
    const token = window.localStorage.getItem("jwt");
    return token;
  },

  deleteToken: () => {
    window.localStorage.removeItem("jwt");
  },

  decodeToken: () => {
    const token = helpers.getToken() || "";

    if (token !== "") {
      const decoded = jwt_decode(token);
      return {
        _id: decoded._id,
        id: decoded.id,
        name: decoded.name,
        surname: decoded.surname,
        email: decoded.email,
      };
    } else {
      return null;
    }
  },
};

export default helpers;
