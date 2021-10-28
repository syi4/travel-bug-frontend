import React from "react";
import { Spinner } from "react-bootstrap";

export const Loader = () => {
  return (
    <>
      <Spinner
        variant="secondary"
        animation="border"
        role="status"
        style={{
          height: "100px",
          width: "100px",
          margin: "auto",
          display: "block",
        }}
      />
    </>
  );
};
