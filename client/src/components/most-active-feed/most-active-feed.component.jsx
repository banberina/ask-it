import React, { useState, useEffect } from "react";

import { withRouter } from "react-router";

import UserCard from "../user-card/user-card.component";

import { Container, Jumbotron, Spinner } from "reactstrap";

import { users } from "../../api/index";

const MostActiveFeed = () => {
  const [usersList, setUsersList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchLatestQuestions = async () => {
    setIsLoading(true);

    await users.getMostActiveUsers().then((res) => {
      setUsersList(res.data);
    });
    setIsLoading(false);
  };

  useEffect(() => {
    fetchLatestQuestions();
  }, []);
  return (
    <div className="most-active-feed">
      <Jumbotron fluid>
        <Container>
          <h3 className="special-font-subheader text-left">
            Most active users:
          </h3>
          <hr />
          {isLoading ? (
            <Spinner />
          ) : (
            usersList.map((user) => {
              return (
                <UserCard
                  key={user.id}
                  name={`${user.name} ${user.surname}`}
                  userID={user.id}
                  numberOfAnswers={user.noOfAnswers}
                />
              );
            })
          )}
        </Container>
      </Jumbotron>
    </div>
  );
};

export default withRouter(MostActiveFeed);
