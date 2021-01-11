import { BASE_URL, getHeaders } from "../utils";
import axios from "./axios";

export const questions = {
  latestQuestions: () => axios.get(`${BASE_URL}/questions`),

  hotQuestions: () => axios.get(`${BASE_URL}/questions/hot`),

  postAQuestion: (body) =>
  axios.post(`${BASE_URL}/questions`, body, {
    headers: getHeaders(),
  }),

  getOneQuestion: (questionKey) =>
    axios.get(`${BASE_URL}/questions/${questionKey}`, {
      headers: getHeaders(),
    }),

  postAnAnswer: (questionKey, body) =>
    axios.post(`${BASE_URL}/questions/${questionKey}/answer`, body, {
      headers: getHeaders(),
    }),

  editAnAnswer: (questionKey, answerKey, body) =>
    axios.put(
      `${BASE_URL}/questions/${questionKey}/answer/${answerKey}`,
      body,
      { headers: getHeaders() }
    ),

  deleteAnAnswer: (questionKey, answerKey, body) =>
    axios.delete(
      `${BASE_URL}/questions/${questionKey}/answer/${answerKey}`,
      body,
      { headers: getHeaders() }
    ),

  increaseNumberOfAnswers: (userKey, body) =>
    axios.put(`${BASE_URL}/questions/${userKey}`, body, {
      headers: getHeaders(),
    }),

  likeTheQuestion: (questionKey, body) =>
    axios.put(`${BASE_URL}/questions/${questionKey}/voteup`, body, {
      headers: getHeaders(),
    }),

  dislikeTheQuestion: (questionKey, body) =>
    axios.put(`${BASE_URL}/questions/${questionKey}/votedown`, body, {
      headers: getHeaders(),
    }),

  likeTheAnswer: (questionKey, answerKey, body) =>
    axios.put(
      `${BASE_URL}/questions/${questionKey}/answer/${answerKey}/voteup`,
      body,
      {
        headers: getHeaders(),
      }
    ),

  dislikeTheAnswer: (questionKey, answerKey, body) =>
    axios.put(
      `${BASE_URL}/questions/${questionKey}/answer/${answerKey}/votedown`,
      body,
      {
        headers: getHeaders(),
      }
    ),
};
