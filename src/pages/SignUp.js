import React from "react";
import { Container, Card, Button, Row } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { Form, Formik } from "formik";
import { InputField } from "../components/InputField";
import { useDispatch } from "react-redux";
import { signUp } from "../state/actions/authActions";

const SignUp = () => {
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
          Sign up
        </Card.Title>
        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          onSubmit={(signUpFormData, { setFieldError, setSubmitting }) => {
            dispatch(signUp(signUpFormData, history, setFieldError));
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <InputField name="username" placeholder="Username" type="text" />
              <InputField name="email" placeholder="Email" type="text" />
              <InputField
                name="password"
                placeholder="Password"
                type="password"
              />
              <InputField
                name="confirmPassword"
                placeholder="Confirm Password"
                type="password"
              />
              <Row className="justify-content-center">
                <Button
                  className="mt-1"
                  variant="primary"
                  type="submit"
                  style={{ width: "150px" }}
                  disabled={isSubmitting}
                >
                  Sign Up
                </Button>
              </Row>
              <Row className="mt-3 text-center">
                <Card.Text>
                  Already have an account? <Link to="/login">Login</Link>
                </Card.Text>
              </Row>
            </Form>
          )}
        </Formik>
      </Card>
    </Container>
  );
};

export default SignUp;
