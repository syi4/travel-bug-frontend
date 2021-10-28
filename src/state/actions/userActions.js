import * as UC from "../constants/userConstants";
import * as api from "../../api/index";

export const getUserPosts = (user) => async (dispatch) => {
  try {
    dispatch({ type: UC.START_LOADING });
    const {
      data: { posts, filteredCountry, username },
    } = await api.getUserProfile(user);

    dispatch({
      type: UC.FETCH_USER_PROFILE,
      payload: { posts, filteredCountry, username },
    });
    dispatch({ type: UC.STOP_LOADING });
  } catch (error) {
    console.log(error);
  }
};
