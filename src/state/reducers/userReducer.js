import * as UC from "../constants/userConstants";

export const userProfileReducer = (
  state = {
    loading: true,
    usersPosts: [],
    filteredCountry: [],
    countByCountry: [],
  },
  action
) => {
  switch (action.type) {
    case UC.START_LOADING:
      return { ...state, loading: true };
    case UC.STOP_LOADING:
      return { ...state, loading: false };
    case UC.FETCH_USER_PROFILE:
      return {
        ...state,
        usersPosts: action.payload.posts,
        filteredCountry: action.payload.filteredCountry,
        userProfileName: action.payload.username,
      };
    default:
      return state;
  }
};
