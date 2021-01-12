import QuestionsActionTypes from "./QuestionsActionTypes";

const INITIAL_STATE = [];

const questionsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case QuestionsActionTypes.GET_LATEST_QUESTIONS:
      return action.questionsList;
    case QuestionsActionTypes.GET_HOT_QUESTIONS:
        return action.hotQuestionsList
    default:
      return state;
  }
};

export default questionsReducer;
