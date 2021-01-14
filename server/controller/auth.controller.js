const User = require("../models/user.model");

const jwt = require("jsonwebtoken");

let config;
if (!process.env.HEROKU) {
  config = require("../config");
}

module.exports = {
  // SIGN UP WITH A NEW USER DATA

  signup: (req, res, next) => {
    const newUser = new User({
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
      surname: req.body.surname,
      role: req.body.role || "user",
    });

    newUser.save(function (err) {
      if (err) {
        res.send({
          success: false,
          message: "Sign up failed",
        });
      } else {
        res.send({
          success: true,
          message: "Sign up success",
          user: newUser,
        });
      }
    });
  },

  // LOGIN WITH PROVIDED USER DATA

  login: (req, res, next) => {
    User.findOne(
      {
        email: req.body.email,
        password: req.body.password,
      },
      (err, user) => {
        if (err) {
          res.status(500).send({
            message: "Error when login",
          });
        } else if (user === null) {
          res.status(400).send({
            message: "User is not found or password is not match",
          });
        } else {
          const data = {
            _id: user._id,
            id: user.id,
            name: user.name,
            surname: user.surname,
            email: user.email,
          };
          const token = jwt.sign(
            data,
            process.env.JWT_SECRET || config.JWT_SECRET,
            { expiresIn: "2h"}
          );
          res.send({
            token: token,
            data: data,
          });
        }
      }
    );
  },

  // CHECK TOKEN FOR AUTHORIZATION

  checkToken: (req, res, next) => {
    const token = req.headers.authorization || req.body.token;
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || config.JWT_SECRET
    );

    if (decoded) {
      res.send(decoded);
    } else {
      res.send({ message: "TOKEN IS INVALID" });
    }
  },

  isAuthorized: (req, res, next) => {
    const decoded = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET || config.JWT_SECRET
    );

    if (decoded) {
      next();
    } else {
      res.send({ message: "YOU ARE NOT AUTHORIZED" });
    }
  },
};
