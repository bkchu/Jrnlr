import axios from "axios";

//ACTION TYPE
const GET_POSTS = "GET_POSTS";
const GET_POSTS_BY_USER_ID = "GET_POSTS_BY_USER_ID";
const GET_POST = "GET_POST";
const ADD_POST = "ADD_POST";
const DELETE_POST = "DELETE_POST";
const UPDATE_POST = "UPDATE_POST";
const LIKE_BUTTON_PRESSED = "LIKE_BUTTON_PRESSED";

//INITIAL STATE
const initialState = {
  posts: [],
  loading: false,
  loadingPosts: false,
  error: null,
  selectedPost: null,
  numLikes: 0,
  userLiked: false,
  likes: []
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

export const getPostsByUserId = userid => {
  return {
    type: GET_POSTS_BY_USER_ID,
    payload: axios
      .get(`/api/users/${userid}/posts`)
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

export const likeButtonPressed = () => {
  return {
    type: LIKE_BUTTON_PRESSED
  };
};

export default function postReducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_POSTS}_PENDING`:
      return { ...state, loading: true };
    case `${GET_POSTS}_FULFILLED`:
      if (Array.isArray(action.payload)) {
        return { ...state, error: null, posts: action.payload, loading: false };
      } else {
        return { ...state, error: action.payload, loading: false };
      }

    case `${GET_POSTS_BY_USER_ID}_PENDING`:
      return { ...state, loadingPosts: true };
    case `${GET_POSTS_BY_USER_ID}_FULFILLED`:
      if (Array.isArray(action.payload)) {
        return {
          ...state,
          error: null,
          posts: action.payload,
          loadingPosts: false
        };
      } else {
        return { ...state, error: action.payload, loadingPosts: false };
      }

    case `${GET_POST}_PENDING`:
      return { ...state, loading: true };
    case `${GET_POST}_FULFILLED`:
      if (Array.isArray(action.payload)) {
        return {
          ...state,
          error: null,
          selectedPost: action.payload,
          loading: false,
          userLiked: action.payload[0].userLiked,
          likes: action.payload[0].likes,
          numLikes: action.payload[0].numLikes
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

    case LIKE_BUTTON_PRESSED:
      return {
        ...state,
        numLikes: state.userLiked ? state.numLikes - 1 : state.numLikes + 1,
        userLiked: !state.userLiked
      };

    default:
      return state;
  }
}
