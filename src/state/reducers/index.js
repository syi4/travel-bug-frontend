import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { postsReducer } from "./postReducer";
import { userProfileReducer } from "./userReducer";

export const reducers = combineReducers({
  posts: postsReducer,
  auth: authReducer,
  userProfile: userProfileReducer,
});
