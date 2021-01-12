import React from "react";
import { Jumbotron, Button, Row, Col } from "reactstrap";

const NotAvailable = () => {
  return (
    <div>
      <Jumbotron>
        <h2 className="special-font-subheader">
          This feature is for registered users only
        </h2>
        <hr className="my-4" />

        <Row>
          <Col>
            <p className="special-font-subheader">
              To get a full experience, please register by clicking on the
              button below
            </p>
            <p className="lead">
              <Button
                size="lg"
                className="special-font-subheader"
                color="info"
                href="/signup"
              >
                Sign up
              </Button>
            </p>
          </Col>
          <Col>
            <h4 className="special-font-subheader">Already registered?</h4>
            <br />
            <p className="lead">
              <Button
                size="lg"
                className="special-font-subheader"
                color="info"
                href="/login"
              >
                Sign in
              </Button>
            </p>
          </Col>
        </Row>
      </Jumbotron>
    </div>
  );
};

export default NotAvailable;
