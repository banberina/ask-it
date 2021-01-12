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
    auth: localStorage.getItem("jwt"),
  };
};

export const checkToken = () => {
  if (!localStorage.getItem("jwt")) {
    return false;
  } else {
    if (localStorage.getItem("jwt").exp < Math.floor(Date.now() / 1000)) {
      localStorage.removeItem("jwt");
      return false;
    }
  }
  return true;
};

export const BASE_URL = getBaseUrl();
