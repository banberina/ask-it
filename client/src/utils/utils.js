import helpers from './helpers'

const getBaseUrl = () => {
  let baseUrl;
  if (process.env.NODE_ENV === "development") {
    baseUrl = "http://localhost:5000";
  } else {
    baseUrl = "https://ask-it-application.herokuapp.com";
  }
  return baseUrl;
};

export const getHeaders = () => {
  return {
    auth: helpers.getToken(),
  };
};

export const checkToken = () => {
  if (!helpers.getToken()) {
    return false;
  } else {
    if (helpers.decodeToken().exp < Math.floor(Date.now() / 1000)) {
      localStorage.removeItem("jwt");
      window.location.reload();
      return false;
    }
  }
  return true;
};

export const BASE_URL = getBaseUrl();
