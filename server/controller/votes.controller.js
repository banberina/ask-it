const mongoose = require("mongoose");
const Question = require("../models/question.model");
const User = require("../models/user.model");
const helpers = require("../helpers/index");

module.exports = {
  voteUpAQuestion: (req, res, next) => {
    const token = req.headers.authorization || req.body.token;
    const user = helpers.decodeToken(token);
    if (user) {
      votes = req.params.votes;
      Question.findOneAndUpdate(
        { _id: req.params.qID },
        { $inc: { votes: 1 } },
        function (err) {
          if (err) {
            res.send(err);
          } else {
            res.send({ message: "The question is liked" });
          }
        }
      );
    } else {
      res.send({ message: "User token is invalid" });
    }
  },

  voteDownAQuestion: (req, res, next) => {
    const token = req.headers.authorization || req.body.token;
    const user = helpers.decodeToken(token);
    if (user) {
      votes = req.params.votes;
      Question.findOneAndUpdate(
        { _id: req.params.qID },
        { $inc: { votes: -1 } },
        function (err) {
          if (err) {
            res.send(err);
          } else {
            res.send({ message: "The question is disliked" });
          }
        }
      );
    } else {
      res.send({ message: "User token is invalid" });
    }
  },

  voteUpAnAnswer: (req, res, next) => {
    const token = req.headers.authorization || req.body.token;
    const user = helpers.decodeToken(token);
    if (user) {
      answers = req.params.answers;
      Question.findOneAndUpdate(
        { _id: req.params.qID, "answers._id": req.params.aID },
        { $inc: { "answers.$.votes": 1 } },
        function (err) {
          if (err) {
            res.send(err);
          } else {
            res.send({ message: "The answer is liked" });
          }
        }
      );
    } else {
      res.send({ message: "User token is invalid" });
    }
  },

  voteDownAnAnswer: (req, res, next) => {
    const token = req.headers.authorization || req.body.token;
    const user = helpers.decodeToken(token);
    if (user) {
      answers = req.params.answers;
      Question.findOneAndUpdate(
        { _id: req.params.qID, "answers._id": req.params.aID },
        { $inc: { "answers.$.votes": -1 } },
        function (err) {
          if (err) {
            res.send(err);
          } else {
            res.send({ message: "The answer is disliked" });
          }
        }
      );
    } else {
      res.send({ message: "User token is invalid" });
    }
  },
};
