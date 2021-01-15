import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Card,
  Button,
  CardTitle,
  CardLink,
  CardSubtitle,
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  Spinner,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

import AnswerCard from "../answer-card/answer-card.component";

import helpers from "../../utils/helpers";
import { checkToken } from "../../utils/utils";
import { questions } from "../../api/index";

import moment from "moment";

const QuestionCardDetailed = () => {
  const [answersList, setAnswersList] = useState([]);
  const [question, setQuestion] = useState("");
  const [name, setName] = useState("");
  const [votesChange, setVotesChange] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState({
    content: "",
    by: "helpers.decodeToken()._id"
  });
  
  const location = useLocation();

  const fetchQuestion = async () => {
    await questions
      .getOneQuestion(location.pathname.split("/")[2])
      .then((res) => {
        console.log(res.data);
        setQuestion(res.data);
        setName(res.data.by);
        setAnswersList(res.data.answers);
      });
  };

  const upvoteQuestion = async (questionId) => {
    await questions.likeTheQuestion(questionId).then(() => {
      setVotesChange(true);
    });
  };

  const downvoteQuestion = async (questionId) => {
    await questions.dislikeTheQuestion(questionId).then((res) => {
      setVotesChange(true);
    });
  };

  const upvoteAnswer = async (questionId,answerId) => {
    await questions.likeTheAnswer(questionId,answerId).then(() => {
      setVotesChange(true);
    });
  };

  const downvoteAnswer = async (questionId, answerId) => {
    await questions.dislikeTheAnswer(questionId, answerId).then((res) => {
      setVotesChange(true);
    });
  };

  const editAnswer = async (questionId,answerId) => {
    await questions.editAnAnswer(questionId,answerId).then(() => {
      
    });
  };

  const deleteAnswer = async (questionId, answerId) => {
    await questions.deleteAnAnswer(questionId,answerId).then((res) => {
      
    });
  };


  const handleInput = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const handleAnswerSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    await questions
      .postAnAnswer(location.pathname.split("/")[2],input)
      .then((res) => {
        window.location.href = location.pathname;
        toast.success("You've posted a new answer!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      })
      .catch((error) => {
        toast.warning("Something's not right, try again!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      });
      setIsLoading(false);
};

  useEffect(() => {
    fetchQuestion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [votesChange]);

  return (
    <div className="question-card">
      <Container fluid>
        <Card body style={{ backgroundColor: "#ebcf73" }}>
          <CardTitle tag="h1" style={{ textAlign: "left" }}>
            <CardLink
              style={{
                color: "#4ea3bd",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              {question.content}
            </CardLink>
          </CardTitle>
          <CardSubtitle style={{ textAlign: "left", color: "#8a5353" }}>
            posted by<br/>
            <CardLink
              href={`/profile/${name._id}`}
              style={{ color: "#8a5353", cursor: "pointer", fontWeight: "bold" }}
            >
            {name.name} {name.surname}
            </CardLink>
            <br />
            {moment(`${question.createdAt}`).format("LLL")}
          </CardSubtitle>
          <hr />{" "}
          {checkToken() ? (
            <div>
              <Button
                className="btn float-left"
                outline
                color="light"
                onClick={upvoteQuestion}
                size="sm"
              >
                <FontAwesomeIcon icon={faArrowUp} /> {question.votes}
              </Button>
              <Button
                className="btn btn-danger float-left"
                outline
                color="light"
                onClick={downvoteQuestion}
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
                <FontAwesomeIcon icon={faArrowUp} /> {question.votes}
              </p>
            </div>
          )}{" "}
        </Card>
        <hr />
        {answersList.map((oneAnswer) => (
          <AnswerCard
            key={oneAnswer._id}
            answerContent={oneAnswer.content}
            answerName={`${oneAnswer.by.name} ${oneAnswer.by.surname}`}
            answerNameID={oneAnswer.by._id}
            noOfAnswerLikes={oneAnswer.votes}
            qID={question._id}
            aID={oneAnswer._id}
            upvoteAnswer={upvoteAnswer}
            downvoteAnswer={downvoteAnswer}
            editAnswer={editAnswer}
            deleteAnswer={deleteAnswer}
            answerTime={moment(`${oneAnswer.createdAt}`).format("LLL")}
            token={checkToken}
          />
        ))}

        <hr />
        {checkToken() ? (
          <div>

            <Card body inverse color="info">
        <hr />
        <h5 className="special-font-subheader" style={{textAlign:"left"}}>Want to give your answer?</h5>
        <hr className="my-2" />
        <Form className="form" onSubmit={handleAnswerSubmit}>
          <FormGroup>
            <Label for="content" className="special-font-subheader"></Label>
            <Input
              required={true}
              type="textarea"
              name="content"
              id="content"
              placeholder="Type your answer here"
              onChange={handleInput}
            />
          </FormGroup>
          <Button
            disabled={isLoading}
            type="submit"
            color="light"
            className="special-font-subheader"
          >
            {isLoading ? <Spinner size="sm" /> : "Post"}
          </Button>
        </Form>
      </Card>
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
              <FontAwesomeIcon icon={faArrowUp} /> {question.votes}
            </p>
          </div>
        )}

      </Container>
    </div>
  );
};

export default QuestionCardDetailed;
