import React from "react";
import { withRouter } from "react-router-dom";
import { Container, Jumbotron } from "reactstrap";
import AskQuestionForm from "../../components/ask-question-form/ask-question-form.component";

const AskQuestionPage = () => {
    return(
  <div>
    <Jumbotron>
      <Container>
        <h3 className="special-font-subheader text-left">My questions</h3>
        <hr />
        <AskQuestionForm />
        <hr />
      </Container>
    </Jumbotron>
  </div>);
};

export default withRouter(AskQuestionPage);
