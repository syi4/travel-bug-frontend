import * as api from "../../api/index";
import { loginValidation } from "../../validations/loginValidation";
import { registerValidation } from "../../validations/registerValidation";
import { AUTH } from "../constants/authConstants";

export const logIn =
  (logInFormData, router, setFieldError) => async (dispatch) => {
    try {
      const { data } = await api.login(logInFormData);

      if (data.status === "FAILED") {
        const { message } = data;

        loginValidation(message, setFieldError);
      }
      if (data.status === "SUCCESS") {
        dispatch({ type: AUTH, data });

        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

export const signUp =
  (signUpFormData, router, setFieldError) => async (dispatch) => {
    try {
      const { data } = await api.signup(signUpFormData);

      if (data.status === "FAILED") {
        const { message } = data;

        registerValidation(message, setFieldError);
      }
      if (data.status === "SUCCESS") {
        dispatch({ type: AUTH, data });

        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
