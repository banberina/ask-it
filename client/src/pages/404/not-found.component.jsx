import React from "react";
import { Jumbotron, Card } from "reactstrap";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <Jumbotron>
        <h1 className="special-font-subheader">Error 404: Not found</h1>
        <h3 className="special-font-subheader">This page does not exist.</h3>
        <hr />
        <Card  body outline color='info' ><Link
          className="special-font-header"
          style={{
            color: "#35d1ed",
            fontSize:'25px',
            textDecoration: "none",
          }}
        to='/'
        >
          Return to home
        </Link></Card>
        
      </Jumbotron>
    </div>
  );
};

export default NotFound;
