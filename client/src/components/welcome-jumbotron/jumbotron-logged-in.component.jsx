import React from "react";

import { Jumbotron, Container } from "reactstrap";

const JumbotronLoggedIn = () => {
  return (
    <div>
      <Jumbotron fluid>
        <Container fluid>
          <h2 className="special-font-subheader">Welcome back</h2>
        </Container>
      </Jumbotron>
    </div>
  );
};

export default JumbotronLoggedIn;
