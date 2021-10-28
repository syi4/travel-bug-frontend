import React from "react";
import { Image, Container } from "react-bootstrap";

export const ProfileModal = ({ post }) => {
  return (
    <Container
      style={{
        padding: 0,
        margin: 0,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Image
        src={post.selectedFile}
        style={{ objectFit: "cover", height: "600px", width: "800px" }}
      />
    </Container>
  );
};
