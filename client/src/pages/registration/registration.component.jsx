import React from "react";

import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

import { Container, Jumbotron } from "reactstrap";

const RegistrationPage = () => {
  return (
    <div className="registration-page">
      <Jumbotron>
        <Container>
          <SignUpForm />
        </Container>
      </Jumbotron>
    </div>
  );
};

export default RegistrationPage;
