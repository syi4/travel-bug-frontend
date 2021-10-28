export const registerValidation = (message, setFieldError) => {
  if (message.includes("Username taken")) {
    setFieldError("username", message);
  }
  if (message.includes("Username length must be greater than 3")) {
    setFieldError("username", message);
  }
  if (message.includes("Invalid email address")) {
    setFieldError("email", message);
  }
  if (message.includes("Password length must be greater than 5")) {
    setFieldError("password", message);
  }
  if (message.includes("Passwords do not match")) {
    setFieldError("confirmPassword", message);
  }
};
