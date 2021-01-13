import React from "react";

import {
  Card,
  Button,
  CardTitle,
  CardLink,
  CardSubtitle,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";

import { checkToken } from "../../utils/utils";

const QuestionCard = ({
  questionContent,
  questionName,
  questionID,
  likeQuestion,
  dislikeQuestion,
  noOfQuestionLikes,
}) => {
  return (
    <div className="question-card">
      <Card body inverse color="info">
        <CardTitle tag="h5" style={{ textAlign: "left" }}>
          <CardLink
            style={{ color: "white", cursor: "pointer", fontWeight: "bold" }}
            href={`/question/${questionID}`}
          >
            {questionContent}
          </CardLink>
        </CardTitle>
        <CardSubtitle style={{ textAlign: "left" }}>
          {questionName}
        </CardSubtitle>
        <hr />
        {checkToken() ? (
          <div>
            <Button
              className="btn float-left"
              outline
              color="light"
              onClick={likeQuestion}
              size="sm"
            >
              <FontAwesomeIcon icon={faArrowUp} /> {noOfQuestionLikes}
            </Button>
            <Button
              className="btn btn-danger float-left"
              outline
              color="light"
              onClick={dislikeQuestion}
              size="sm"
            >
              <FontAwesomeIcon icon={faArrowDown} />
            </Button>
          </div>
        ) : (
          <div>
            <p
              style={{
                color: "white",
                padding: "0.005rem",
                cursor: "not-allowed",
              }}
              className="btn float-left"
            >
              <FontAwesomeIcon icon={faArrowUp} /> {noOfQuestionLikes}
            </p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default QuestionCard;
