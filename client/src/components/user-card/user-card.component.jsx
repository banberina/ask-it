import React from "react";

import { Card, CardText, CardTitle, Button } from "reactstrap";

const UserCard = ({ name, userID, numberOfAnswers }) => {
  return (
    <div className="answer-card">
      <Card
        body
        inverse
        style={{ backgroundColor: "#ebcf73", borderColor: "#5a4fc" }}
      >
        <CardTitle tag="h5" style={{ color: "#8a5353", textAlign: "left" }}>
          {name}
        </CardTitle>
        <CardText
          className="text-muted"
          style={{ textAlign: "left" }}
        >{`Number of answers: ${numberOfAnswers}`}</CardText>
        <div>
          <Button
            className="btn float-left"
            href={`/profile/${userID}`}
            size="sm"
            color="info"
            style={{ textAlign: "left", fontWeight: "bold",color: "khaki" }}
          >
            Visit profile
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default UserCard;
