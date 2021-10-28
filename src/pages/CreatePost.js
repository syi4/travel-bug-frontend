import React, { useEffect, useRef, useState } from "react";
import { Button, Card, Container, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form as FormikForm } from "formik";
import { InputField } from "../components/InputField";
import { createPost } from "../state/actions/postActions";

const CreatePost = () => {
  const [image, setImage] = useState();
  const [preview, setPreview] = useState();
  const fileInputRef = useRef();
  const dispatch = useDispatch();
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("profile"));
  const { loading } = useSelector((state) => state.posts);

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(image);
    } else {
      setPreview(null);
    }
  }, [image]);

  return (
    <Container style={{ maxWidth: "450px" }} className="mt-4">
      <Card className="p-3">
        <Formik
          initialValues={{
            selectedFile: null,
            location: "",
            caption: "",
          }}
          onSubmit={(postData, { setFieldError, setSubmitting }) => {
            dispatch(
              createPost(
                {
                  ...postData,
                  username: user?.result?.user,
                },
                history,
                setFieldError
              )
            );
            setSubmitting(false);
          }}
        >
          {({ setFieldValue }) => (
            <FormikForm>
              {preview ? (
                <Card.Img
                  src={preview}
                  style={{
                    height: "400px",
                    marginBottom: "20px",
                    objectFit: "cover",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    fileInputRef.current.click();
                  }}
                />
              ) : (
                <Button
                  variant="link"
                  style={{
                    height: "400px",
                    width: "390px",
                    textDecoration: "none",
                    marginBottom: "20px",
                  }}
                  onClick={() => {
                    fileInputRef.current.click();
                  }}
                >
                  + Add Image
                </Button>
              )}
              <input
                name="selectedFile"
                type="file"
                style={{ display: "none" }}
                accept="image/*"
                ref={fileInputRef}
                onChange={(e) => {
                  const file = e.target.files[0];
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    const upload = reader.result;
                    setFieldValue("selectedFile", upload);
                  };
                  reader.readAsDataURL(file);

                  if (file && file.type.substr(0, 5) === "image") {
                    setImage(file);
                  } else {
                    setImage(null);
                  }
                }}
              />
              <InputField
                name="location"
                placeholder="City, Country..."
                type="text"
              />
              <InputField
                name="caption"
                placeholder="Enter Caption..."
                as="textarea"
                rows={5}
              />
              <Row className="d-flex justify-content-center">
                <Button
                  variant="primary"
                  type="submit"
                  style={{ width: "200px" }}
                  disabled={loading}
                >
                  Create Post
                </Button>
              </Row>
            </FormikForm>
          )}
        </Formik>
      </Card>
    </Container>
  );
};

export default CreatePost;
