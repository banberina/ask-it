import React, { useState } from "react";
import "./navbar.styles.scss";
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

import { checkToken } from "../../utils/utils";

const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

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
                  <NavLink className="nav" href="/notifications">
                    Login
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav" href="/logout">
                    Sign up
                  </NavLink>
                </NavItem>
              </Nav>
            ) : (
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink className="nav" href="/signup">
                    Sign up
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav" href="/login">
                    Login
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

export default NavBar;
