import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";

import {
  Container,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  Collapse,
} from "reactstrap";

import { users } from "../../api/index";
import { checkToken } from "../../utils/utils";
import helpers from "../../utils/helpers";

const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState("");

  const fetchUserName = async () => {
    await users
      .getOneUser(helpers.decodeToken()._id)
      .then((res) => setId(res.data._id));
  };

  useEffect(() => {
    if (checkToken()) fetchUserName();
  }, []);

  const toggle = () => setIsOpen(!isOpen);

  const logout = () => {
    helpers.deleteToken();
    props.history.push("/");
  };

  return (
    <div className="navigation">
      <Navbar color="info" dark expand="sm" className="mb-5">
        <Container>
          <NavbarBrand className="special-font-header" href="/">
            AskIt
          </NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            {checkToken() ? (
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink
                    className="special-font-subheader"
                    href="/askquestion"
                  >
                    Ask a question
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className="special-font-subheader"
                    href={`/myquestions/${id}`}
                  >
                    My questions
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className="special-font-subheader"
                    href={`/profile/${id}`}
                  >
                    My profile
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    onClick={logout}
                    className="special-font-subheader"
                    style={{ cursor: "pointer" }}
                  >
                    Log out
                  </NavLink>
                </NavItem>
              </Nav>
            ) : (
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink className="special-font-subheader" href="/signup">
                    Sign up
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="special-font-subheader" href="/login">
                    Sign in
                  </NavLink>
                </NavItem>
              </Nav>
            )}
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default withRouter(NavBar);
