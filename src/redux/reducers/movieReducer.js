import { ActionTypes } from "../actionTypes";

const initialState = {
  popularMovies: [],
  isLoading: false,
  isError: false,
};

const movieReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_MOVIES_LOADING:
      return { ...state, isLoading: true };
    case ActionTypes.SET_MOVIES_ERROR:
      return { ...state, isLoading: false, isError: payload };

    case ActionTypes.SET_MOVIES:
      return {
        ...state,
        isLoading: false,
        isEror: false,
        popularMovies: payload,
      };

    default:
      return state;
  }
};

export default movieReducer;
