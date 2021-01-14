import React, { useState, useEffect } from "react";

import { withRouter } from "react-router";

import UserCard from "../user-card/user-card.component";

import { Container, Jumbotron, Spinner } from "reactstrap";

import { users } from "../../api/index";

const MostActiveFeed = () => {
  const [usersList, setUsersList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMostActive = async () => {
    setIsLoading(true);

    await users.getMostActiveUsers().then((res) => {
      setUsersList(res.data);
    });
    setIsLoading(false);
  };

  useEffect(() => {
    fetchMostActive();
  }, []);

  return (
    <div className="most-active-feed">
      <Jumbotron>
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
                  key={user._id}
                  name={`${user.name} ${user.surname}`}
                  userID={user._id}
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
