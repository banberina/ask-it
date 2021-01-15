import React, { useState, useEffect } from "react";

import { withRouter, useLocation } from "react-router";

import QuestionCard from "../../components/question-cards/question-card.component";

import { Container, Jumbotron, Spinner, Button } from "reactstrap";

import { questions } from "../../api/index";

import moment from "moment";

import { checkToken } from "../../utils/utils";

const MyQuestionsPage = () => {
  const [questionList, setQuestionList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [visibleQuestions, setVisibleQuestions] = useState(20);
  const [isEmpty, setIsEmpty] = useState(true);

  const location = useLocation();

  const fetchMyQuestions = async () => {
    setIsLoading(true);

    await questions
      .getmyQuestions(location.pathname.split("/")[2])
      .then((res) => {
        setQuestionList(res.data);
        if (res.data.length > 0) {
          setIsEmpty(false);
        }
      });
    setIsLoading(false);
  };

  const handleLoadMore = () => {
    setVisibleQuestions((prevVisibleQuestions) => prevVisibleQuestions + 3);
  };

  useEffect(() => {
    if (checkToken()) fetchMyQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="latest-questions-feed">
      <Jumbotron>
        <Container>
          <h3 className="special-font-subheader text-left">My questions</h3>
          <hr />
          {isLoading ? (
            <Spinner />
          ) : isEmpty ? (
            <h2 className="special-font-subheader">
              You don't have any questions
            </h2>
          ) : (
            questionList.slice(0, visibleQuestions).map((question) => {
              return (
                <QuestionCard
                myquestions={true}
                key={question._id}
                questionContent={question.content}
                questionName={`${question.by.name} ${question.by.surname}`}
                questionID={question._id}
                profileID={question.by._id}
                noOfQuestionLikes={question.votes}
                noOfComments={question.answers.length}
                timeOfPostingQuestion={moment(`${question.createdAt}`).format(
                  "LLL"
                  )}
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

export default withRouter(MyQuestionsPage);
