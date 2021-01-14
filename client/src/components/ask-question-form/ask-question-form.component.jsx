import React, { useState } from "react";
import { questions } from "../../api/index";
import helpers from "../../utils/helpers";
import { toast } from "react-toastify";

import {
  Card,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Spinner,
} from "reactstrap";

const AskQuestionForm = (props) => {
  const [input, setInput] = useState({
    content: "",
    by: helpers.decodeToken()._id,
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInput = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    await questions
      .postAQuestion(input)
      .then((res) => {
        window.location.href = "/";
        toast.success("You've posted a new question!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      })
      .catch((error) => {
        toast.warning("Something's not right, try again!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      });

    setIsLoading(false);
  };
  return (
    <div className="sign-in-form">
      <Card body inverse color="info">
        <hr />
        <h2 className="special-font-header">Post your question</h2>
        <hr className="my-2" />
        <Form className="form" onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="content" className="special-font-subheader"></Label>
            <Input
              required={true}
              type="textarea"
              name="content"
              id="content"
              placeholder="Type your question here"
              onChange={handleInput}
            />
          </FormGroup>
          <Button
            disabled={isLoading}
            type="submit"
            color="light"
            className="special-font-subheader"
          >
            {isLoading ? <Spinner size="sm" /> : "Post"}
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default AskQuestionForm;
