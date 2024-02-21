import { ActionTypes } from "../actionTypes";

const initialState = {
  genres: [],
  isLoading: false,
  isError: false,
};

const genreReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_GENRES_LOADING:
      return { ...state, isLoading: true };
    case ActionTypes.SET_GENRES_ERROR:
      return { ...state, isLoading: false, isError: payload };

    case ActionTypes.SET_GENRES:
      return {
        ...state,
        isLoading: false,
        isEror: false,
        genres: payload,
      };

    default:
      return state;
  }
};

export default genreReducer;
