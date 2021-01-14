import React, { useState, useEffect } from "react";

import { Jumbotron, Container } from "reactstrap";

import { users } from "../../api/index";

import { checkToken } from "../../utils/utils";

import helpers from "../../utils/helpers";

const JumbotronLoggedIn = () => {
  const [name, setName] = useState("");

   const fetchUserName = async () => {
    await users
      .getOneUser(helpers.decodeToken()._id)
      .then((res) => setName(res.data.name));
  };

  useEffect(() => {
    if (!checkToken()) {
      window.location.reload();
    } else {
      fetchUserName();
    }
  }, []);
 
  return (
    <div>
      <Jumbotron style={{ backgroundColor: "#ebcf73", borderColor: "#5a4fc" }}>
        <Container>
          <h1 style={{ color: "#2888a5c", fontFamily: "Architects Daughter"}}>Welcome back, {name}.</h1>
        </Container>
      </Jumbotron>
    </div>
  );
};

export default JumbotronLoggedIn;
