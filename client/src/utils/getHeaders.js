export const getHeaders = () => {
  return {
    Authorization: localStorage.getItem("jwtToken"),
  };
};
