const mongoose = require("mongoose");
const Question = require("../models/question.model");
const helpers = require("../helpers/index");
const User = require("../models/user.model");

module.exports = {
  postAnAnswer: (req, res, next) => {
    const token = req.headers.authorization || req.body.token;
    const user = helpers.decodeToken(token);
    if (user) {
      const newAnswer = {
        content: req.body.content,
        by: user._id,
      };
      Question.updateOne(
        { _id: req.params.qID },
        { $push: { answers: newAnswer } },
        function (err) {
          if (err) {
            res.send(err);
          } else {
            res.send({
              data: newAnswer,
            });
          }
        }
      );
    } else {
      res.send({ message: "User token is invalid" });
    }
  },

  editAnAnswer: (req, res, next) => {
    const token = req.headers.authorization || req.body.token;
    const user = helpers.decodeToken(token);
    if (user) {
      Question.updateOne(
        { _id: req.params.qID, "answers._id": req.params.aID },
        { $set: { "answers.$.content": req.body.content } }
      )
        .then(function () {
          Question.findOne({
            _id: req.params.qID,
            "answers._id": req.params.aID,
          }).then(function (answer) {
            res.send(answer);
          });
        })
        .catch((err) => console.error(err));
    } else {
      res.send({ message: "User token is invalid" });
    }
  },

  deleteAnAnswer: (req, res, next) => {
    const token = req.headers.authorization || req.body.token;
    const user = helpers.decodeToken(token);
    if (user) {
      Question.findOneAndUpdate(
        { _id: req.params.qID, "answers._id": req.params.aID },
        { $pull: { answers: { _id: req.params.aID } } }
      )
        .then(function (answer) {
          res.send(answer);
        })
        .catch((err) => console.error(err));
    } else {
      res.send({ message: "User token is invalid" });
    }
  },

  increaseNumberOfAnswers: (req, res, next) => {
    const token = req.headers.authorization || req.body.token;
    const user = helpers.decodeToken(token);
    if (user) {
      User.findOneAndUpdate(
        { "_id": req.params.uID },
        { $inc: { noOfAnswers: 1 } }
      )
        .then(function () {
          Question.findOne({
            _id: req.params.qID,
            "answers._id": req.params.aID,
          }).then(function (num) {
            res.send(num);
          });
        })
        .catch((err) => console.error(err));
    } else {
      res.send({ message: "User token is invalid" });
    }
  },

  decreaseNumberOfAnswers: (req, res, next) => {
    const token = req.headers.authorization || req.body.token;
    const user = helpers.decodeToken(token);
    if (user) {
      User.findOneAndUpdate(
        { "_id": req.params.uID },
        { $inc: { noOfAnswers: -1 } }
      )
        .then(function () {
          Question.findOne({
            _id: req.params.qID,
            "answers._id": req.params.aID,
          }).then(function (num) {
            res.send(num);
          });
        })
        .catch((err) => console.error(err));
    } else {
      res.send({ message: "User token is invalid" });
    }
  },
};
