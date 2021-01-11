const getBaseUrl = () => {
  let baseUrl;
  if (process.env.NODE_ENV === "development") {
    baseUrl = "http://localhost:3001";
  } else {
    baseUrl = "https://granapp.herokuapp.com";
  }
  return baseUrl;
};

export const getHeaders = () => {
  return {
    auth: localStorage.getItem("jwt"),
  };
};

export const parseJwt = (token) => {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
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
