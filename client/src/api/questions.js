import { BASE_URL, getHeaders } from "../utils/utils";
import axios from "axios";
import helpers from "../utils/helpers";

const questions = {
  latestQuestions: () => axios.get(`${BASE_URL}/questions`),

  hotQuestions: () => axios.get(`${BASE_URL}/questions/hot`),

  postAQuestion: (body) =>
    axios.post(`${BASE_URL}/questions`, body, {
      headers: { Authorization: helpers.getToken() },
    }),

  getOneQuestion: (questionKey) =>
    axios.get(`${BASE_URL}/questions/${questionKey}`, {
      headers: getHeaders(),
    }),

  getmyQuestions: (userKey) =>
    axios.get(`${BASE_URL}/users/myquestions/${userKey}`, {
      headers: { Authorization: helpers.getToken() },
    }),

  postAnAnswer: (questionKey, body) =>
    axios.post(`${BASE_URL}/questions/${questionKey}/answer`, body, {
      headers: { Authorization: helpers.getToken() },
    }),

  editAnAnswer: (questionKey, answerKey, body) =>
    axios.put(
      `${BASE_URL}/questions/${questionKey}/answer/${answerKey}`,
      body,
      { headers: { Authorization: helpers.getToken() } }
    ),

  deleteAnAnswer: (questionKey, answerKey, body) =>
    axios.delete(
      `${BASE_URL}/questions/${questionKey}/answer/${answerKey}`,
      body,
      { headers: { Authorization: helpers.getToken() } }
    ),

  increaseNumberOfAnswers: (userKey, body) =>
    axios.put(`${BASE_URL}/questions/${userKey}`, body, {
      headers: { Authorization: helpers.getToken() },
    }),

  likeTheQuestion: (questionKey, body) =>
    axios.put(`${BASE_URL}/questions/${questionKey}/voteup`, body, {
      headers: { Authorization: helpers.getToken() },
    }),

  dislikeTheQuestion: (questionKey, body) =>
    axios.put(`${BASE_URL}/questions/${questionKey}/votedown`, body, {
      headers: { Authorization: helpers.getToken() },
    }),

  likeTheAnswer: (questionKey, answerKey, body) =>
    axios.put(
      `${BASE_URL}/questions/${questionKey}/answer/${answerKey}/voteup`,
      body,
      {
        headers: { Authorization: helpers.getToken() },
      }
    ),

  dislikeTheAnswer: (questionKey, answerKey, body) =>
    axios.put(
      `${BASE_URL}/questions/${questionKey}/answer/${answerKey}/votedown`,
      body,
      {
        headers: { Authorization: helpers.getToken() },
      }
    ),
};

export default questions;
