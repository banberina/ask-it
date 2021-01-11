import React from "react";

import JumbotronLoggedOut from "../../components/welcome-jumbotron/jumbotron-logged-out.component";
import JumbotronLoggedIn from "../../components/welcome-jumbotron/jumbotron-logged-in.component";

import "./home.styles.scss";

import { hasValidJwt } from "../../utils/jwtValidator";

const Homepage = () => {
  return (
    <div className="home">
      {hasValidJwt() ? <JumbotronLoggedIn /> : <JumbotronLoggedOut />}
    </div>
  );
};

export default Homepage;
