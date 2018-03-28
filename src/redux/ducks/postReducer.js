import axios from "axios";

//ACTION TYPE
const GET_POSTS = "GET_POSTS";
const GET_POST = "GET_POST";
const ADD_POST = "ADD_POST";
const DELETE_POST = "DELETE_POST";
const UPDATE_POST = "UPDATE_POST";
const UNMOUNT_POST = "UNMOUNT_POST";

//INITIAL STATE
const initialState = {
  posts: [],
  loading: false,
  error: null,
  selectedPost: null
};

//ACTION CREATOR
export const getPosts = () => {
  return {
    type: GET_POSTS,
    payload: axios
      .get("/api/posts")
      .then(response => response.data)
      .catch(err => {
        if (err.response) {
          return err.response;
        }
      })
  };
};

export const getPost = postid => {
  return {
    type: GET_POST,
    payload: axios
      .get(`/api/posts/${postid}`)
      .then(response => response.data)
      .catch(err => {
        if (err.response) {
          return err.response;
        }
      })
  };
};

export const addPost = body => {
  return {
    type: ADD_POST,
    payload: axios
      .post("/api/posts", body)
      .then(response => response.data)
      .catch(err => {
        if (err.response) {
          return err.response;
        }
      })
  };
};

export const deletePost = postid => {
  console.log("reducer::postid", postid);
  return {
    type: DELETE_POST,
    payload: axios
      .delete(`/api/posts/${postid}`)
      .then(response => response.data)
      .catch(err => {
        if (err.response) {
          return err.response;
        }
      })
  };
};

export const updatePost = (postid, body) => {
  console.log("postid: ", postid);
  console.log("body: ", body);
  return {
    type: UPDATE_POST,
    payload: axios
      .put(`/api/posts/${postid}`, body)
      .then(response => response.data)
      .catch(err => {
        if (err.response) {
          return err.response;
        }
      })
  };
};

export const unmountPost = () => {
  return {
    type: UNMOUNT_POST
  };
};

export default function postReducer(state = initialState, action) {
  console.log("action.type: ", action.type);
  switch (action.type) {
    case `${GET_POSTS}_PENDING`:
      return { ...state, loading: true };
    case `${GET_POSTS}_FULFILLED`:
      if (Array.isArray(action.payload)) {
        return { ...state, error: null, posts: action.payload, loading: false };
      } else {
        return { ...state, error: action.payload, loading: false };
      }
    case `${GET_POST}_FULFILLED`:
      if (Array.isArray(action.payload)) {
        return {
          ...state,
          error: null,
          selectedPost: action.payload,
          loading: false
        };
      } else {
        return { ...state, error: action.payload, loading: false };
      }
    case `${ADD_POST}_PENDING`:
      return { ...state, loading: true };
    case `${ADD_POST}_FULFILLED`:
      if (Array.isArray(action.payload)) {
        return { ...state, error: null, posts: action.payload, loading: false };
      } else {
        return { ...state, error: action.payload, loading: false };
      }

    case `${DELETE_POST}_PENDING`:
      return { ...state, loading: true };
    case `${DELETE_POST}_FULFILLED`:
      if (Array.isArray(action.payload)) {
        return { ...state, error: null, posts: action.payload, loading: false };
      } else {
        return { ...state, error: action.payload, loading: false };
      }

    case `${UPDATE_POST}_PENDING`:
      return { ...state, loading: true };
    case `${UPDATE_POST}_FULFILLED`:
      if (Array.isArray(action.payload)) {
        return { ...state, error: null, posts: action.payload, loading: false };
      } else {
        return { ...state, error: action.payload, loading: false };
      }

    case UNMOUNT_POST:
      return { ...state, selectedPost: null };

    default:
      return state;
  }
}
