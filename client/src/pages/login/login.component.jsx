import React from "react";
import { withRouter } from "react-router-dom";

import { Container, Jumbotron } from "reactstrap";

import SignInForm from "../../components/sign-in-form/sign-in-form.component";

const LoginPage = () => {
  return (
    <div className="login-page">
      <Jumbotron>
        <Container>
          <SignInForm />
        </Container>
      </Jumbotron>
    </div>
  );
};

export default withRouter(LoginPage);
