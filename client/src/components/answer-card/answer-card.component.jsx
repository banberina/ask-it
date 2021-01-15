import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

import {
  Card,
  Button,
  CardText,
  CardLink,
  Modal,
  ModalHeader,
  Form,
  FormGroup,
  ModalBody,
  Label,
  Input,
  ModalFooter,
} from "reactstrap";

import { checkToken } from "../../utils/utils";

const AnswerCard = ({
  answerContent,
  answerName,
  answerNameID,
  qID,
  aID,
  modal,
  openEditModal,
  editAnswer,
  handleEditInput,
  deleteAnswer,
  noOfAnswerLikes,
  upvoteAnswer,
  downvoteAnswer,
  isMine,
  answerTime,
  oldQuestion,
  content,
}) => {
  return (
    <div className="answer-card">
      <Card body color="info">
        <CardText tag="h4" style={{ color: "white", textAlign: "left" }}>
          {answerContent}
        </CardText>
        <CardText tag="h6">
          <p style={{ color: "#ebcf73", textAlign: "left" }}>
            Posted by{" "}
            <CardLink
              href={`/profile/${answerNameID}`}
              style={{
                color: "white",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              {answerName}
            </CardLink>{" "}
            <br />
            {answerTime}
          </p>
        </CardText>
        {checkToken() ? (
          <div>
            <Button
              className="btn float-left"
              outline
              color="light"
              onClick={() => upvoteAnswer(qID, aID)}
              size="sm"
            >
              <FontAwesomeIcon icon={faArrowUp} /> {noOfAnswerLikes}
            </Button>
            <Button
              className="btn btn-danger float-left"
              outline
              color="light"
              onClick={() => downvoteAnswer(qID, aID)}
              size="sm"
              type="submit"
            >
              <FontAwesomeIcon icon={faArrowDown} />
            </Button>
            {isMine ? (
              <div>
                <Button
                  color="danger"
                  className="btn float-right"
                  onClick={() => deleteAnswer(qID, aID)}
                  size="sm"
                >
                  Delete
                </Button>
                <Button
                  className="btn float-right"
                  color="success"
                  style={{ outlineColor: "white" }}
                  onClick={() => openEditModal()}
                  size="sm"
                >
                  Edit
                </Button>
              </div>
            ) : null}
          </div>
        ) : (
          <div>
            <p
              style={{
                color: "white",
                padding: "0.005rem",
                cursor: "not-allowed",
              }}
              className="btn float-left"
            >
              <FontAwesomeIcon icon={faArrowUp} /> {noOfAnswerLikes}
            </p>
          </div>
        )}
      </Card>
      <Modal isOpen={modal} toggle={openEditModal}>
        <ModalHeader toggle={openEditModal}>Edit answer</ModalHeader>
        <Form className="form" onSubmit={() => editAnswer(qID, aID)}>
          <FormGroup>
            <ModalBody>
              <Label for="content" className="special-font-subheader"></Label>
              <Input
                required={true}
                type="textarea"
                name={content}
                id={content}
                placeholder={oldQuestion}
                onChange={handleEditInput}
              />

              <ModalFooter>
                <Button color="info" onClick={() => editAnswer(qID, aID)}>
                  Edit{" "}
                </Button>{" "}
                <Button color="secondary" onClick={() => openEditModal()}>
                  Cancel
                </Button>
              </ModalFooter>
            </ModalBody>
          </FormGroup>
        </Form>
      </Modal>
    </div>
  );
};

export default AnswerCard;
