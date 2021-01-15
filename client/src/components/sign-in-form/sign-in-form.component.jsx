import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { auth } from "../../api/index";
import { checkToken } from "../../utils/utils";
import helpers from "../../utils/helpers";
import { toast } from "react-toastify";

import {
  Card,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Spinner,
  InputGroup,
} from "reactstrap";

const SignInForm = (props) => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (checkToken()) {
      toast.success("You're logged in!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
      props.history.push("/");
    }
  }, [props.history]);

  const handleInput = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    await auth
      .login(input)
      .then((res) => {
        if (res.data.token) {
          helpers.setToken(res.data.token);
          window.location.reload();
        }
      })
      .catch((error) => {
        toast.warning("Something's not right, try again!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        });
      });

    setIsLoading(false);
  };
  return (
    <div className="sign-in-form">
      <Card body inverse color="info">
        <hr />
        <h2 className="special-font-header">Sign in</h2>
        <hr className="my-2" />

        <Form className="form" onSubmit={handleSubmit}>
          <Col>
            <FormGroup>
              <Label for="email" className="special-font-subheader">
                Email
              </Label>
              <Input
                required={true}
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                value={input.email}
                onChange={handleInput}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="password" className="special-font-subheader">Password
              </Label>
              <InputGroup>
                <Input
                  required={true}
                  minLength="5"
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={input.password}
                  onChange={handleInput}
                />
              </InputGroup>
            </FormGroup>
          </Col>
          <Button
            disabled={isLoading}
            type="submit"
            color="light"
            className="special-font-subheader"
          >
            {isLoading ? <Spinner size="sm" /> : "Login"}
          </Button></Form>
        <hr />
        <div>
          Don't have an account?
          <br />
          <Link
            className="special-font-subheader"
            style={{
              color: "white",
              textDecoration: "none",
              fontStyle: "italic",
            }}
            to="/signup"
          >
            Register here
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default withRouter(SignInForm);
