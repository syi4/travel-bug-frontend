import React from "react";
import { Button, Col, Alert } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deletePost } from "../state/actions/postActions";

export const DeleteAlert = ({ setShowAlert, post }) => {
  const dispatch = useDispatch();
  return (
    <Alert
      variant="light"
      dismissible
      onClose={() => setShowAlert(false)}
      style={{ height: "400px" }}
    >
      <Col style={{ textAlign: "center", paddingTop: "125px" }}>
        <Alert.Heading style={{ color: "#000000" }}>
          Are you sure you want to delete this post?
        </Alert.Heading>
        <br />
        <Button
          onClick={() => dispatch(deletePost(post._id))}
          variant="danger"
          size="lg"
        >
          DELETE POST
        </Button>
      </Col>
    </Alert>
  );
};
