const mongoose = require("mongoose");
const Question = require("../models/question.model");
const User = require("../models/user.model");
const helpers = require("../helpers/index");

module.exports = {
  getAllQuestions: (req, res, next) => {
    Question.find({})
      .sort({ createdAt: -1 })
      .populate("by")
      .populate("answers.by")
      .then(function (questions) {
        res.send(questions);
      })
      .catch((err) => console.error(err));
  },
  
  getHotQuestions: (req, res, next) => {
    Question.find({})
      .sort({ votes: -1 })
      .then(function (questions) {
        res.send(questions);
      })
      .catch((err) => console.error(err));
  },

  postAQuestion: (req, res, next) => {
    const token = req.headers.authorization || req.body.token;
    const user = helpers.decodeToken(token);
    if (user) {
      //Create a Question
      const newQuestion = new Question({
        by: user._id,
        content: req.body.content,
      });
      // Save
      newQuestion.save(function (err) {
        if (err) {
          res.send(err);
        } else {
          res.send({
            data: newQuestion,
          });
        }
      });
    } else {
      res.send({ message: "User token is invalid" });
    }
  },

  getAQuestion: (req, res, next) => {
    Question.findOne({ _id: req.params.qID })
      .populate("by")
      .populate("answers.by")
      .then(function (question) {
        res.send(question);
      })
      .catch((err) => console.error(err));
  },

  editAQuestion: (req, res, next) => {
    const token = req.headers.authorization || req.body.token;
    const user = helpers.decodeToken(token);
    if (user) {
      Question.findByIdAndUpdate(
        { _id: req.params.qID },
        {
          content: req.body.content,
        }
      )
        .then(function () {
          Question.findOne({ _id: req.params.qID }).then(function (question) {
            res.send(question);
          });
        })
        .catch((err) => console.error(err));
    } else {
      res.send({ message: "Not authorized to edit this question" });
    }
  },

  deleteAQuestion: (req, res, next) => {
    const token = req.headers.authorization || req.body.token;
    const user = helpers.decodeToken(token);
    if (user) {
      Question.findOneAndRemove({ _id: req.params.qID })
        .then(function (question) {
          res.send(question);
        })
        .catch((err) => console.error(err));
    } else {
      res.send({ message: "Not authorized to delete this question" });
    }
  },
};
