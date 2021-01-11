import React from "react";
import { Jumbotron } from "reactstrap";

const NotFound = () => {
  return (
    <div>
      <Jumbotron>
        <h1 className="special-font-subheader">Error 404: Not found</h1>
        <h2>This page does not exist.</h2>
      </Jumbotron>
    </div>
  );
};

export default NotFound;
