import axios from "axios";

//ACTION TYPE
const ADD_LIKE = "ADD_LIKE";
const GET_LIKES = "GET_LIKES";

const initialState = {
  numLikes: 0,
  loading: false,
  error: null
};

export const addLike = postid => {
  return {
    type: ADD_LIKE,
    payload: axios
      .post(`/api/likes/${postid}`)
      .then(response => response.data)
      .catch(err => {
        if (err.response) {
          return err.response;
        }
      })
  };
};

export const getLikes = postid => {
  return {
    type: GET_LIKES,
    payload: axios
      .get(`/api/likes/${postid}`)
      .then(response => {
        return response.data[0].count;
      })
      .catch(err => {
        if (err.response) {
          return err.response;
        }
      })
  };
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case `${ADD_LIKE}_PENDING`:
      return { ...state, loading: true };

    case `${ADD_LIKE}_FULFILLED`:
      if (Array.isArray(action.payload)) {
        return {
          ...state,
          error: null,
          numLikes: action.payload,
          loading: false
        };
      } else {
        return { ...state, error: action.payload, loading: false };
      }
    case `${GET_LIKES}_PENDING`:
      return { ...state, loading: true };

    case `${GET_LIKES}_FULFILLED`:
      if (typeof action.payload === "number") {
        return {
          ...state,
          error: null,
          numLikes: action.payload,
          loading: false
        };
      } else {
        return { ...state, error: action.payload, loading: false };
      }

    default:
      return state;
  }
}
