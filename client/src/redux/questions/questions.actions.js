import QuestionsActionTypes from "./QuestionsActionTypes";
import { questions } from "../../api/index";

export const getLatestQuestions = () => {
  return (dispatch) => {
    let questionsList = [];
    questions
      .latestQuestions()
      .then((res) => {
        console.log(res.data);
        questionsList = res.data;
      })
      .catch((err) => {
        console.log(err.res);
      })
      .finally(() => {
        console.log(`${questionsList.length} items have been retrieved.`);
        dispatch({
          type: QuestionsActionTypes.GET_LATEST_QUESTIONS,
          questionsList: questionsList,
        });
      });
  };
};

export const getHotQuestions = () => {
    return (dispatch) => {
      let questionsList = [];
      questions
        .latestQuestions()
        .then((res) => {
          console.log(res.data);
          questionsList = res.data;
        })
        .catch((err) => {
          console.log(err.res);
        })
        .finally(() => {
          console.log(`${questionsList.length} items have been retrieved.`);
          dispatch({
            type: QuestionsActionTypes.GET_HOT_QUESTIONS,
            questionsList: questionsList,
          });
        });
    };
  };
