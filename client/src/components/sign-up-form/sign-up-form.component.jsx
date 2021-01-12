import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { auth } from "../../api/index";
import { checkToken } from "../../utils/utils";
import { toast } from "react-toastify";

import {
  Card,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  Row,
} from "reactstrap";

const SignUpForm = (props) => {
  const [input, setInput] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (checkToken()) {
      props.history.push("/");
    }
  }, [props.history]);

  const handleInput = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await auth
      .registration(input)
      .then(() => {
        toast.success("You're registered, welcome to Ask.it!", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
          });
        props.history.push("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="sign-up-form">
      <Card body inverse color="info">
        <hr />
        <h2 className="special-font-header">Register to Ask.it</h2>
        <Form className="form" onSubmit={handleSubmit}>
          <Row>
            <Col md="6">
              <FormGroup>
                <Label size="sm" for="name" className="special-font-subheader">
                  First name
                </Label>
                <Input
                  bsSize="sm"
                  type="text"
                  name="name"
                  id="name"
                  placeholder="John"
                  onChange={handleInput}
                />
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup>
                <Label
                  size="sm"
                  for="surname"
                  className="special-font-subheader"
                >
                  Last name
                </Label>
                <Input
                  bsSize="sm"
                  type="text"
                  name="surname"
                  id="surname"
                  placeholder="Smith"
                  onChange={handleInput}
                />
              </FormGroup>
            </Col>
          </Row>
          <FormGroup>
            <Label size="sm" for="email" className="special-font-subheader">
              Your email
            </Label>
            <Input
              required={true}
              bsSize="sm"
              type="email"
              name="email"
              id="email"
              placeholder="example@mail.com"
              onChange={handleInput}
            />
          </FormGroup>
          <FormGroup>
            <Label size="sm" for="password" className="special-font-subheader">
              Password
            </Label>
            <Input
              required={true}
              bsSize="sm"
              minLength="5"
              type="password"
              name="password"
              id="password"
              placeholder="********"
              onChange={handleInput}
            />
          </FormGroup>
          <Button
            type="submit"
            color="light"
            className="special-font-subheader"
          >
            Sign up
          </Button>
        </Form>
        <div>
          <hr />
          Already have an account?
          <br />
          <Link
            className="special-font-subheader"
            style={{
              color: "white",
              textDecoration: "none",
              fontStyle: "italic",
            }}
            to="/login"
          >
            Login here!
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default withRouter(SignUpForm);
