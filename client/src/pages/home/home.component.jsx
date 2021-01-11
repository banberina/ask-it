import React from "react";

import JumbotronLoggedOut from "../../components/welcome-jumbotron/jumbotron-logged-out.component";
import JumbotronLoggedIn from "../../components/welcome-jumbotron/jumbotron-logged-in.component";
import LatestQuestionsFeed from "../../components/latest-questions-feed/latest-questions-feed.component";

import "./home.styles.scss";

import { checkToken } from "../../utils/utils";

const Homepage = () => {
  return (
    <div className="home">
      {checkToken() ? <JumbotronLoggedIn /> : <JumbotronLoggedOut />}
      <LatestQuestionsFeed />
    </div>
  );
};

export default Homepage;
