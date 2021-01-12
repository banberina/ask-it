import React from "react";

import { Card, Button, CardText } from "reactstrap";

import { checkToken } from "../../utils/utils";

const AnswerCard = ({
  answer: {
    answerContent,
    answerName,
    likeAnswer,
    dislikeAnswer,
    editAnswer,
    deleteAnswer,
    noOfAnswerLikes,
    noOfAnswerDislikes,
  },
}) => {
  return (
    <div className="answer-card">
      <Card body outline color="warning">
        <CardText>{answerContent}</CardText>
        <CardText>
          <small className="text-muted">By {answerName}</small>
        </CardText>
        <div className="bg-info clearfix" style={{ padding: ".5rem" }}>
          <button className="btn btn-secondary float-left" onClick={likeAnswer}>
            <i class="fas fa-thumbs-up"></i>
            {noOfAnswerLikes}
          </button>
          <button
            className="btn btn-danger float-right"
            onClick={dislikeAnswer}
          >
            {noOfAnswerDislikes}
            <i class="fas fa-thumbs-down"></i>
          </button>
        </div>
        {checkToken() ? (
          <div>
            <Button color="success" onClick={editAnswer}>
              Edit
            </Button>
            <Button color="danger" onClick={deleteAnswer}>
              Comment
            </Button>
          </div>
        ) : (
          <div></div>
        )}
      </Card>
    </div>
  );
};

export default AnswerCard;
