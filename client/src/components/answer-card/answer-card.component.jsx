import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

import { Card, Button, CardText, CardLink } from "reactstrap";

import helpers from "../../utils/helpers";

import { checkToken } from "../../utils/utils";

const AnswerCard = ({
  answerContent,
  answerName,
  answerNameID,
  qID,
  aID,
  editAnswer,
  deleteAnswer,
  noOfAnswerLikes,
  upvoteAnswer,
  downvoteAnswer,
  decode,
  answerTime
}) => {
  return (
    <div className="answer-card">
      <Card body color="info">
        <CardText tag="h4" style={{ color: "white", textAlign: "left" }}>
          {answerContent}
        </CardText>
        <CardText>
          <h6 style={{ color: "#ebcf73", textAlign: "left" }}>
            Posted by{" "}
            <CardLink
              href={`/profile/${answerNameID}`}
              style={{ color: "white", cursor: "pointer", fontWeight: "bold" }}
            >
              {answerName}
            </CardLink>{" "}<br/>{answerTime}
          </h6>
        </CardText>
        {checkToken() ? (
          <div>
            <Button
              className="btn float-left"
              outline
              color="light"
              onClick={() =>upvoteAnswer(qID,aID)}
              size="sm"
            >
              <FontAwesomeIcon icon={faArrowUp} /> {noOfAnswerLikes}
            </Button>
            <Button
              className="btn btn-danger float-left"
              outline
              color="light"
              onClick={() => downvoteAnswer(qID,aID)}
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
              <FontAwesomeIcon icon={faArrowUp} /> {noOfAnswerLikes}
            </p>
          </div>
        )}

        {checkToken() && (helpers.decodeToken()._id === {answerNameID}) ? (
          <div>
            <Button color="success" onClick={() =>editAnswer()}>
              Edit
            </Button>
            <Button color="danger" onClick={() =>deleteAnswer()}>
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
