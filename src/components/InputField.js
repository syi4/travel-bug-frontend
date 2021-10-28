import React from "react";
import { Form } from "react-bootstrap";
import { useField } from "formik";

export const InputField = ({ ...props }) => {
  const [field, { error }] = useField(props);
  return (
    <Form.Group className="mb-4">
      <Form.Control {...field} {...props} isInvalid={!!error} />
      {error ? (
        <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      ) : null}
    </Form.Group>
  );
};
