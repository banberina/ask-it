import React from "react";
import { Jumbotron, Container, Row, Col, Button } from "reactstrap";

const JumboTron = () => {
  return (
    <div>
      <Jumbotron fluid>
        <Container fluid="md">
          <h1 className="special-font-header">Ask.it</h1>
          <p className="special-font-subheader">
            {" "}
            The best place to find out everything.
          </p>
          <hr className="my-4" />
          <Row><Col>
            <p className="special-font-subheader">
              To get a full experience, please register by clicking on the
              button below
            </p>{" "}
            <p className="lead">
              <Button size='lg' className="special-font-subheader" color="info" href='/signup'>
                Sign up
              </Button>
            </p></Col><Col>
            <h4 className="special-font-subheader">Already registered?</h4>
            <br />
            <p className="lead">
              <Button size='lg' className="special-font-subheader" color="info" href='/login'>
                Login{" "}
              </Button>
            </p></Col>
          </Row>
        </Container>
      </Jumbotron>
    </div>
  );
};

export default JumboTron;
