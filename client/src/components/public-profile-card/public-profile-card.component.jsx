import React from "react";

import { withRouter } from "react-router-dom";

import { ReactComponent as Logo } from "../../assets/avatar.svg";

import {
  Jumbotron,
  Card,
  CardTitle,
  CardSubtitle,
  CardText,
  CardBody,
} from "reactstrap";

const PublicProfile = ({ name, email, numberOfAnswers }) => {
  return (
      <Card>
        <CardBody>
          <Logo width="15%" />
          <CardTitle tag="h2">{name}</CardTitle>
          <CardSubtitle tag="h2" className="mb-2 text-muted">
            {email}
          </CardSubtitle>
          <CardText>Number of given answers: {numberOfAnswers}</CardText>
        </CardBody>
      </Card>
  );
};

export default withRouter(PublicProfile);
