import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_HEROKU_URL,
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

export const getUserProfile = (user) => API.get(`/user/${user}`);
export const fetchPosts = (page) => API.get(`/?page=${page}`);
export const createPost = (newPost) => API.post("/create-post", newPost);
export const deletePost = (id) => API.delete(`/${id}`);
export const commentPost = (id, value) =>
  API.post(`post/${id}/commentPost`, { value });
export const login = (logInFormData) => API.post("/login", logInFormData);
export const signup = (signUpFormData) => API.post("/signup", signUpFormData);
