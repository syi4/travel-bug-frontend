import * as PC from "../constants/postConstants";
import * as api from "../../api/index";

export const createPost = (postData, router) => async (dispatch) => {
  try {
    dispatch({ type: PC.START_LOADING });

    const { result } = JSON.parse(localStorage.getItem("profile"));
    const { data } = await api.createPost(postData);

    dispatch({ type: PC.CREATE_POST, payload: data });

    router.push(`/user/${result.user}`);

    dispatch({ type: PC.RESET_POSTS });

    dispatch({ type: PC.STOP_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getPosts = (page) => async (dispatch) => {
  try {
    const {
      data: { posts, sameTravelByCountry, countPostsByUser, totalPosts },
    } = await api.fetchPosts(page);

    dispatch({
      type: PC.FETCH_ALL_POSTS,
      payload: {
        posts,
        sameTravelByCountry,
        countPostsByUser,
        totalPosts,
      },
    });

    dispatch({ type: PC.STOP_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);

    dispatch({ type: PC.DELETE_POST, payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const commentPost = (id, value) => async (dispatch) => {
  try {
    const { data } = await api.commentPost(value, id);

    dispatch({ type: PC.COMMENT_POST, payload: data });

    return data.comments;
  } catch (error) {
    console.log(error);
  }
};
