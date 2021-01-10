const jwt = require("jsonwebtoken");
let config;
if (!process.env.HEROKU) {
  config = require("../config");
}
module.exports = {
  // DECODE TOKEN
  decodeToken: (token) => {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || config.JWT_SECRET
    );

    if (decoded) return decoded;
    else return null;
  },
};
