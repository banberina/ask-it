const mongoose = require("mongoose");
const User = require("../models/user.model");
const Question = require("../models/question.model");
const helpers = require("../helpers/index");

module.exports = {
  getUsersWithMostComments: (req, res, next) => {
    const users = User.find({}, (err, users) => {
      if (err) res.send(err);
      else res.send(users);
    });
  },

  getAUser: (req, res, next) => {
    const user = User.findOne(
      {
        _id: req.params.uID,
      },
      (err, user) => {
        if (err) res.send(err);
        else res.send(user);
      }
    );
  },

  getMyQuestions: (req, res, next) => {
    const token = req.headers.authorization || req.body.token;
    const user = helpers.decodeToken(token);
    if (user) {
      Question.find({ by: req.params.uID })
        .then(function (questions) {
          res.send(questions);
        })
        .catch((err) => console.error(err));
    } else {
      res.send({ message: "User token is invalid" });
    }
  },

  editAUserName: (req, res, next) => {
    const token = req.headers.authorization || req.body.token;
    const user = helpers.decodeToken(token);
    if (user) {
      User.findByIdAndUpdate(
        { _id: req.params.uID },
        {
          name: req.body.name,
        }
      )
        .then(function () {
          User.findOne({ _id: req.params.uID }).then(function (name) {
            res.send(name);
          });
        })
        .catch((err) => console.error(err));
    } else {
      res.send({ message: "Not authorized to edit this" });
    }
  },

  editAUserSurname: (req, res, next) => {
    const token = req.headers.authorization || req.body.token;
    const user = helpers.decodeToken(token);
    if (user) {
      User.findByIdAndUpdate(
        { _id: req.params.uID },
        {
          surname: req.body.surname,
        }
      )
        .then(function () {
          User.findOne({ _id: req.params.uID }).then(function (surname) {
            res.send(surname);
          });
        })
        .catch((err) => console.error(err));
    } else {
      res.send({ message: "Not authorized to edit this" });
    }
  },

  editAUserEmail: (req, res, next) => {
    const token = req.headers.authorization || req.body.token;
    const user = helpers.decodeToken(token);
    if (user) {
      User.findByIdAndUpdate(
        { _id: req.params.uID },
        {
          email: req.body.email,
        }
      )
        .then(function () {
          User.findOne({ _id: req.params.uID }).then(function (email) {
            res.send(email);
          });
        })
        .catch((err) => console.error(err));
    } else {
      res.send({ message: "Not authorized to edit this" });
    }
  },

  editAUserPassword: (req, res, next) => {
    const token = req.headers.authorization || req.body.token;
    const user = helpers.decodeToken(token);
    if (user) {
      User.findByIdAndUpdate(
        { _id: req.params.uID },
        {
          password: req.body.password,
        }
      )
        .then(function () {
          User.findOne({ _id: req.params.uID }).then(function (password) {
            res.send(password);
          });
        })
        .catch((err) => console.error(err));
    } else {
      res.send({ message: "Not authorized to edit this" });
    }
  },
};
