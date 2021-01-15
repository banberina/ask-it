import React, { useState, useEffect } from "react";
import { useLocation, withRouter } from "react-router-dom";

import { users } from "../../api/index";
import helpers from "../../utils/helpers";
import { checkToken } from "../../utils/utils";

import { toast } from "react-toastify";

import {
  Card,
  Button,
  Form,
  FormGroup,
  Input,
  Col,
  Row,
  Container,
} from "reactstrap";

const ChangeProfileDataCard = (props) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");

  const location = useLocation();

  const fetchUser = async () => {
    await users
      .getOneUser(helpers.decodeToken()._id)
      .then((res) => setUser(res.data));
  };

  useEffect(() => {
    if (checkToken()) fetchUser();
  }, []);

  const handleInput = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    setName((...prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
    setSurname(() => ({
      [name]: value,
    }));
    setEmail(() => ({
      [name]: value,
    }));
    setPassword(() => ({
      [name]: value,
    }));
  };

  const handleNameSubmit = async (event) => {
    event.preventDefault();
    await users
      .changeName(location.pathname.split("/")[2], name)
      .then(() => {
        toast.success("You've changed your name!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSurnameSubmit = async (event) => {
    event.preventDefault();
    await users
      .changeSurname(location.pathname.split("/")[2], name)
      .then(() => {
        toast.success("You've changed your name!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEmailSubmit = async (event) => {
    event.preventDefault();
    await users
      .changeEmail(location.pathname.split("/")[2], name)
      .then(() => {
        toast.success("You've changed your name!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlePasswordSubmit = async (event) => {
    event.preventDefault();
    await users
      .changePassword(location.pathname.split("/")[2], name)
      .then(() => {
        toast.success("You've changed your name!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="sign-up-form">
      <br />
      <Container fluid="sm">
        <Card body inverse color="info">
          <h2 className="special-font-header"  style={{ textAlign: "left" }}>Change my profile info</h2>
          <hr />
          <Row>
            <Col md="4">
              <Form className="form" onSubmit={handleNameSubmit}>
                <FormGroup>
                  <Input
                    bsSize="sm"
                    type="text"
                    name="name"
                    id="name"
                    placeholder={user.name}
                    onChange={handleInput}
                  />
                </FormGroup>
                <Button color="warning" size="sm">
                  Change Name
                </Button>
              </Form>
            </Col>
            <Col md="4">
              {" "}
              <Form className="form" onSubmit={handleSurnameSubmit}>
                <FormGroup>
                  <Input
                    bsSize="sm"
                    type="text"
                    name="surname"
                    id="surname"
                    placeholder={user.surname}
                    onChange={handleInput}
                  />
                </FormGroup>{" "}
                <Button color="warning" size="sm">
                  Change Surname
                </Button>
              </Form>
            </Col>
            <Col md="4">
              <Form className="form" onSubmit={handleEmailSubmit}>
                <FormGroup>
                  <Input
                    bsSize="sm"
                    type="email"
                    name="email"
                    id="email"
                    placeholder={user.email}
                    onChange={handleInput}
                  />
                </FormGroup>{" "}
                <Button color="warning" size="sm">
                  Change Email
                </Button>
              </Form>
            </Col>
          </Row>
        </Card>
      </Container>
      <Container fluid="sm">
        <Card body inverse color="info">
          <h2 className="special-font-header" style={{ textAlign: "left" }}>
            Change my password
          </h2>{" "}
          <hr />{" "}
          <Form className="form" onSubmit={handlePasswordSubmit}>
            <FormGroup>
              <Input
                bsSize="sm"
                minLength="5"
                type="password"
                name="password"
                id="password"
                placeholder="********"
                onChange={handleInput}
              />
            </FormGroup>{" "}
            <Button color="danger" size="sm">
              Change password
            </Button>
          </Form>
        </Card>
      </Container>
      <br/>
    </div>
  );
};

export default withRouter(ChangeProfileDataCard);
