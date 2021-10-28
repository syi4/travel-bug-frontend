export const loginValidation = (message, setFieldError) => {
  if (message.includes("User doesn't exist")) {
    setFieldError("username", message);
  }
  if (message.includes("Invalid credentials")) {
    setFieldError("password", message);
  }
};
