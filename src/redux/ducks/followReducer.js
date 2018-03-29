import axios from "axios";

//ACTION TYPE
const ADD_FOLLOW = "ADD_FOLLOW";
const GET_FOLLOWS = "GET_FOLLOWS";
const REMOVE_FOLLOW = "REMOVE_FOLLOW";

const initialState = {
  following: [],
  loading: false,
  error: null
};

export const addFollow = authid => {
  return {
    type: ADD_FOLLOW,
    payload: axios
      .post(`/api/follows/${authid}`)
      .then(response => response.data)
      .catch(err => {
        if (err.response) {
          return err.response;
        }
      })
  };
};

export const getFollows = () => {
  return {
    type: GET_FOLLOWS,
    payload: axios
      .get("/api/follows")
      .then(response => response.data)
      .catch(err => {
        if (err.response) {
          return err.response;
        }
      })
  };
};

export const removeFollow = authid => {
  return {
    type: REMOVE_FOLLOW,
    payload: axios
      .delete(`/api/follows/${authid}`)
      .then(response => response.data)
      .catch(err => {
        if (err.response) {
          return err.response;
        }
      })
  };
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case `${ADD_FOLLOW}_PENDING`:
      return { ...state, loading: true };

    case `${ADD_FOLLOW}_FULFILLED`:
      if (Array.isArray(action.payload)) {
        return {
          ...state,
          error: null,
          following: action.payload,
          loading: false
        };
      } else {
        return { ...state, error: action.payload, loading: false };
      }

    case `${GET_FOLLOWS}_PENDING`:
      return { ...state, loading: true };
    case `${GET_FOLLOWS}_FULFILLED`:
      if (Array.isArray(action.payload)) {
        return {
          ...state,
          error: null,
          following: action.payload,
          loading: false
        };
      } else {
        return { ...state, error: action.payload, loading: false };
      }

    case `${REMOVE_FOLLOW}_PENDING`:
      return { ...state, loading: true };
    case `${REMOVE_FOLLOW}_FULFILLED`:
      if (Array.isArray(action.payload)) {
        return {
          ...state,
          error: null,
          following: action.payload,
          loading: false
        };
      } else {
        return { ...state, error: action.payload, loading: false };
      }

    default:
      return state;
  }
}
