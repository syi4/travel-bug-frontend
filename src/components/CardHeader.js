import React from "react";
import { Card, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export const CardHeader = ({ post, setShowAlert }) => {
  const user = JSON.parse(localStorage.getItem("profile"));

  if (user?.result.user === post.username) {
    return (
      <Card.Header
        as="h4"
        style={{ color: "#000" }}
        className="d-flex justify-content-between "
      >
        {post.username}{" "}
        <FontAwesomeIcon
          as={Button}
          icon={faTrash}
          style={{ cursor: "pointer" }}
          onClick={() => setShowAlert(true)}
        />
      </Card.Header>
    );
  }

  return (
    <Card.Header
      as="h4"
      style={{ color: "#000" }}
      className="d-flex justify-content-between "
    >
      <Link
        to={`/user/${post.username}`}
        style={{ textDecoration: "none", color: "black" }}
      >
        {post.username}
      </Link>
    </Card.Header>
  );
};
