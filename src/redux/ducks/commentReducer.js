import axios from "axios";

//ACTION TYPE'
const GET_COMMENTS = "GET_COMMENTS";
const ADD_COMMENT = "ADD_COMMENT";
const UPDATE_COMMENT = "UPDATE_COMMENT";
const DELETE_COMMENT = "DELETE_COMMENT";

const initialState = {
  comments: [],
  error: null,
  loading: false
};

export const getComments = postid => {
  return {
    type: GET_COMMENTS,
    payload: axios
      .get(`/api/posts/${postid}/comments`)
      .then(response => response.data)
      .catch(err => {
        if (err.response) {
          return err.response;
        }
      })
  };
};

export const addComment = (postid, text) => {
  return {
    type: ADD_COMMENT,
    payload: axios
      .post(`/api/posts/${postid}/comments`, { text })
      .then(response => response.data)
      .catch(err => {
        if (err.response) {
          return err.response;
        }
      })
  };
};

export const updateComment = (commentid, text) => {
  return {
    type: UPDATE_COMMENT,
    payload: axios
      .put(`/api/comments/${commentid}`, { text })
      .then(response => response.data)
      .catch(err => {
        if (err.response) {
          return err.response;
        }
      })
  };
};

export const deleteComment = (commentid, text) => {
  return {
    type: UPDATE_COMMENT,
    payload: axios
      .delete(`/api/comments/${commentid}`)
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
    case `${GET_COMMENTS}_PENDING`:
      return { ...state, loading: true, error: null };
    case `${GET_COMMENTS}_FULFILLED`:
      if (Array.isArray(action.payload)) {
        return {
          ...state,
          comments: action.payload,
          loading: false,
          error: null
        };
      } else {
        return { ...state, loading: false, error: action.payload };
      }
    case `${ADD_COMMENT}_PENDING`:
      return { ...state, loading: true, error: null };
    case `${ADD_COMMENT}_FULFILLED`:
      if (Array.isArray(action.payload)) {
        return {
          ...state,
          comments: action.payload,
          loading: false,
          error: null
        };
      } else {
        return { ...state, loading: false, error: action.payload };
      }
    case `${UPDATE_COMMENT}_PENDING`:
      return { ...state, loading: true, error: null };
    case `${UPDATE_COMMENT}_FULFILLED`:
      if (Array.isArray(action.payload)) {
        return {
          ...state,
          comments: action.payload,
          loading: false,
          error: null
        };
      } else {
        return { ...state, loading: false, error: action.payload };
      }
    case `${DELETE_COMMENT}_PENDING`:
      return { ...state, loading: true, error: null };
    case `${DELETE_COMMENT}_FULFILLED`:
      if (Array.isArray(action.payload)) {
        return {
          ...state,
          comments: action.payload,
          loading: false,
          error: null
        };
      } else {
        return { ...state, loading: false, error: action.payload };
      }
    default:
      return state;
  }
}
