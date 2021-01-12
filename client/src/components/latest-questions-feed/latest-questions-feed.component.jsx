import React , { useEffect, useReducer } from "react";

import QuestionCard from '../question-card/question-card'

import { Container, Jumbotron } from "reactstrap";

const LatestQuestionsFeed = () => {
  return (
    <div>
      <Jumbotron fluid>
        <Container >
          <h5 className="special-font-subheader text-left">
            What's new?
          </h5>
          <Container>
          </Container>
        </Container>
      </Jumbotron>
    </div>
  );
};



export default LatestQuestionsFeed;
