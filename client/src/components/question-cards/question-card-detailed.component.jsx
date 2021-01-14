import React from "react";

import { Card, Button, CardTitle } from "reactstrap";

import AnswerCard from "../answer-card/answer-card.component";

import { checkToken } from "../../utils/utils";

const QuestionCardDetailed = ({
  answers,
  questionContent,
  questionName,
  questionID,
  likeQuestion,
  dislikeQuestion,
  editQuestion,
  deleteQuestion,
  noOfQuestionLikes,
  noOfQuestionDislikes,
}) => {
  return (
    <div className="question-card">
      <Card body inverse color="info">
        <CardTitle tag="h5">{questionContent}</CardTitle>
        <p className="text-muted">By {questionName}</p>
        <div className="bg-info clearfix" style={{ padding: ".5rem" }}>
          <button
            className="btn btn-secondary float-left"
            onClick={likeQuestion}
          >
            <i class="fas fa-thumbs-up"></i>
            {noOfQuestionLikes}
          </button>
          <button
            className="btn btn-danger float-right"
            onClick={dislikeQuestion}
          >
            {noOfQuestionDislikes}
            <i class="fas fa-thumbs-down"></i>
          </button>
        </div>
        {checkToken() ? (
          <div>
            <Button color="success" onClick={editQuestion}>
              Edit
            </Button>
            <Button color="danger" onClick={deleteQuestion}>
              Comment
            </Button>
          </div>
        ) : (
          <div></div>
        )}
        <Button color="light" href={`/question/${ questionID }`}>
          See the question
        </Button>
      </Card>
      {answers.map((oneAnswer) => (
        <AnswerCard key={oneAnswer.id} answer={oneAnswer} />
      ))}
    </div>
  );
};

export default QuestionCardDetailed;
