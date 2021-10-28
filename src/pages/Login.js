import React from "react";
import { Container, Card, Button, Row } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { Form, Formik } from "formik";
import { InputField } from "../components/InputField";
import { useDispatch } from "react-redux";
import { logIn } from "../state/actions/authActions";

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <Container style={{ maxWidth: "350px" }} className="mt-4">
      <Card className="p-3">
        <Card.Title
          as="h1"
          className="mb-4 text-center"
          style={{ color: "#5a5a5a" }}
        >
          Login
        </Card.Title>
        <Formik
          initialValues={{
            username: "",
            password: "",
          }}
          onSubmit={(logInFormData, { setFieldError, setSubmitting }) => {
            dispatch(logIn(logInFormData, history, setFieldError));
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <InputField name="username" placeholder="Username" type="text" />
              <InputField
                name="password"
                placeholder="Password"
                type="password"
              />
              <Row className="justify-content-center">
                <Button
                  variant="primary"
                  type="submit"
                  style={{ width: "150px" }}
                  disabled={isSubmitting}
                >
                  Login
                </Button>
              </Row>
              <Row className="mt-3 text-center">
                <Card.Text className=" ">
                  Don't have an account? <Link to="/signup">Sign Up</Link>
                </Card.Text>
              </Row>
            </Form>
          )}
        </Formik>
      </Card>
    </Container>
  );
};

export default Login;
