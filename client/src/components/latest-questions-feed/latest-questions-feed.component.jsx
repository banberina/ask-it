import React, { useState, useEffect } from "react";

import { withRouter } from "react-router";

import QuestionCard from "../question-cards/question-card.component";

import { Container, Jumbotron, Spinner, Button } from "reactstrap";

import { questions } from "../../api/index";

import moment from "moment";

const LatestQuestionsFeed = () => {
  const [questionList, setQuestionList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [visibleQuestions, setVisibleQuestions] = useState(20);
  const [votesChange, setVotesChange] = useState(false);

  const fetchLatestQuestions = async () => {
    setIsLoading(true);

    await questions.latestQuestions().then((res) => {
      setQuestionList(res.data);
    });
    setIsLoading(false);
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

  const handleLoadMore = () => {
    setVisibleQuestions((prevVisibleQuestions) => prevVisibleQuestions + 3);
  };

  useEffect(() => {
    fetchLatestQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [votesChange]);

  return (
    <div className="latest-questions-feed">
      <Jumbotron>
        <Container>
          <h3 className="special-font-subheader text-left">What's new?</h3>
          <hr />
          {isLoading ? (
            <Spinner />
          ) : (
            questionList.slice(0, visibleQuestions).map((question) => {
              return (
                <QuestionCard
                  myquestions={false}
                  key={question._id}
                  questionContent={question.content}
                  questionName={`${question.by.name} ${question.by.surname}`}
                  questionID={question._id}
                  profileID={question.by._id}
                  noOfQuestionLikes={question.votes}
                  upvote={upvoteQuestion}
                  likeQuestion={question._id}
                  downvote={downvoteQuestion}
                  dislikeQuestion={question._id}
                  noOfComments={question.answers.length}
                  timeOfPostingQuestion={moment(`${question.createdAt}`).format("LLL")}
                />
              );
            })
          )}
          <hr />
          <Button onClick={handleLoadMore}>Load more</Button>
        </Container>
      </Jumbotron>
    </div>
  );
};

export default withRouter(LatestQuestionsFeed);
