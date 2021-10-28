import * as PC from "../constants/postConstants";

export const postsReducer = (
  state = {
    loading: true,
    posts: [],
    countPostsByUser: [],
  },
  action
) => {
  switch (action.type) {
    case PC.START_LOADING:
      return { ...state, loading: true };
    case PC.STOP_LOADING:
      return { ...state, loading: false };
    case PC.FETCH_ALL_POSTS:
      return {
        ...state,
        posts: [...state.posts, ...action.payload.posts],
        sameTravelByCountry: action.payload.sameTravelByCountry,
        countPostsByUser: action.payload.countPostsByUser,
        totalPosts: action.payload.totalPosts,
      };
    case PC.CREATE_POST:
      return { ...state, posts: [...state.posts, action.payload] };
    case PC.RESET_POSTS:
      return { ...state, posts: [] };
    case PC.COMMENT_POST:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post._id === action.payload._id) return action.payload;
          return post;
        }),
      };
    case PC.DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };
    default:
      return state;
  }
};
