import React, { useState, useEffect } from "react";

import { withRouter } from "react-router";

import QuestionCard from "../question-cards/question-card.component";

import { Container, Jumbotron, Spinner } from "reactstrap";

import { questions } from "../../api/index";

import moment from "moment";

const HotQuestionsFeed = () => {
  const [questionList, setQuestionList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [votesChange, setVotesChange] = useState(false);

  const fetchLatestQuestions = async () => {
    setIsLoading(true);

    await questions.hotQuestions().then((res) => {
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

  useEffect(() => {
    fetchLatestQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [votesChange]);

  return (
    <div>
      <Jumbotron>
        <Container>
          <h3 className="special-font-subheader text-left">Hot questions:</h3>
          <hr />
          {isLoading ? (
            <Spinner />
          ) : (
            questionList.map((question) => {
              return (
                <QuestionCard
                  key={question.id}
                  questionContent={question.content}
                  questionName={`${question.by.name} ${question.by.surname}`}
                  questionID={question.id}
                  profileID={question.by.id}
                  noOfQuestionLikes={question.votes}
                  upvote={upvoteQuestion}
                  likeQuestion={question._id}
                  downvote={downvoteQuestion}
                  dislikeQuestion={question._id}
                  timeOfPostingQuestion={moment(`${question.createdAt}`).format(
                    "LLL"
                  )}
                />
              );
            })
          )}
        </Container>
      </Jumbotron>
    </div>
  );
};

export default withRouter(HotQuestionsFeed);
