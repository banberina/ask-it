import React from "react";

import JumbotronLoggedOut from "../../components/welcome-jumbotron/jumbotron-logged-out.component";
import JumbotronLoggedIn from "../../components/welcome-jumbotron/jumbotron-logged-in.component";
import LatestQuestionsFeed from "../../components/latest-questions-feed/latest-questions-feed.component";
import MostActiveFeed from "../../components/most-active-feed/most-active-feed.component";
import HotQuestionsFeed from "../../components/hot-questions-feed/hot-questions-feed.component";

import { checkToken } from "../../utils/utils";

const Homepage = () => {
  return (
    <div className="home">
      {checkToken() ? <JumbotronLoggedIn /> : <JumbotronLoggedOut />}
      <LatestQuestionsFeed />
      <MostActiveFeed />
      <HotQuestionsFeed />
    </div>
  );
};

export default Homepage;
