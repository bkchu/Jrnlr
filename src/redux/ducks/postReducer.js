import axios from 'axios';

//ACTION TYPE
const GET_POSTS = 'GET_POSTS';
const GET_POSTS_BY_USER_ID = 'GET_POSTS_BY_USER_ID';
const GET_POSTS_COUNT = 'GET_POSTS_COUNT';
const GET_POSTS_BY_USER_ID_COUNT = 'GET_POSTS_BY_USER_ID_COUNT';
const GET_INITIAL_POSTS = 'GET_INITIAL_POSTS';
const GET_INITIAL_POSTS_BY_USER_ID = 'GET_INITIAL_POSTS_BY_USER_ID';
const GET_POST = 'GET_POST';
const ADD_POST = 'ADD_POST';
const DELETE_POST = 'DELETE_POST';
const UPDATE_POST = 'UPDATE_POST';
const LIKE_BUTTON_PRESSED = 'LIKE_BUTTON_PRESSED';

//INITIAL STATE
const initialState = {
  posts: [],
  count: 0,
  loading: false,
  loadingPosts: false,
  error: null,
  selectedPost: null,
  numLikes: 0,
  userLiked: false,
  likes: []
};

//ACTION CREATOR
export const getInitialPosts = (page = 0) => {
  return {
    type: GET_INITIAL_POSTS,
    payload: axios.get(`/api/posts?page=${page}`)
  };
};

export const getInitialPostsByUserId = (userid, page = 0) => {
  return {
    type: GET_INITIAL_POSTS_BY_USER_ID,
    payload: axios.get(`/api/users/${userid}/posts?page=${page}`)
  };
};

export const getPosts = (page = 0) => {
  return {
    type: GET_POSTS,
    payload: axios.get(`/api/posts?page=${page}`)
  };
};

export const getPostsByUserId = (userid, page = 0) => {
  return {
    type: GET_POSTS_BY_USER_ID,
    payload: axios.get(`/api/users/${userid}/posts?page=${page}`)
  };
};

export const getPostsCount = () => {
  return {
    type: GET_POSTS_COUNT,
    payload: axios.get(`/api/posts/count`)
  };
};

export const getPostsByUserIdCount = userid => {
  return {
    type: GET_POSTS_BY_USER_ID_COUNT,
    payload: axios.get(`/api/users/${userid}/posts/count`)
  };
};

export const getPost = postid => {
  return {
    type: GET_POST,
    payload: axios.get(`/api/posts/${postid}`)
  };
};

export const addPost = body => {
  return {
    type: ADD_POST,
    payload: axios.post('/api/posts', body)
  };
};

export const deletePost = postid => {
  return {
    type: DELETE_POST,
    payload: axios.delete(`/api/posts/${postid}`)
  };
};

export const updatePost = (postid, body) => {
  return {
    type: UPDATE_POST,
    payload: axios.put(`/api/posts/${postid}`, body)
  };
};

export const likeButtonPressed = () => {
  return {
    type: LIKE_BUTTON_PRESSED
  };
};

export default function postReducer(state = initialState, action) {
  const { type, payload } = action;
  console.log({ type, payload });
  switch (action.type) {
    case `${GET_POSTS_COUNT}_PENDING`:
      return { ...state, loading: true };
    case `${GET_POSTS_COUNT}_FULFILLED`:
      return {
        ...state,
        error: null,
        count: action.payload.data[0].count,
        loading: false
      };
    case `${GET_POSTS_COUNT}_REJECTED`:
      return { ...state, error: action.payload, loading: false };

    case `${GET_POSTS_BY_USER_ID_COUNT}_PENDING`:
      return { ...state, loading: true };
    case `${GET_POSTS_BY_USER_ID_COUNT}_FULFILLED`:
      return {
        ...state,
        error: null,
        count: action.payload.data[0].count,
        loading: false
      };
    case `${GET_POSTS_BY_USER_ID_COUNT}_REJECTED`:
      return { ...state, error: action.payload, loading: false };

    case `${GET_INITIAL_POSTS}_PENDING`:
      return { ...state, loading: true };
    case `${GET_INITIAL_POSTS}_FULFILLED`:
      return {
        ...state,
        error: null,
        posts: action.payload.data,
        loading: false
      };
    case `${GET_INITIAL_POSTS}_REJECTED`:
      return { ...state, error: action.payload, loading: false };

    case `${GET_INITIAL_POSTS_BY_USER_ID}_PENDING`:
      return { ...state, loadingPosts: true };
    case `${GET_INITIAL_POSTS_BY_USER_ID}_FULFILLED`:
      return {
        ...state,
        error: null,
        posts: action.payload.data,
        loadingPosts: false
      };
    case `${GET_INITIAL_POSTS_BY_USER_ID}_REJECTED`:
      return { ...state, error: action.payload, loadingPosts: false };

    case `${GET_POSTS}_PENDING`:
      return { ...state, loading: true };
    case `${GET_POSTS}_FULFILLED`:
      return {
        ...state,
        error: null,
        posts: [...state.posts, ...action.payload.data],
        loading: false
      };
    case `${GET_POSTS}_REJECTED`:
      return { ...state, error: action.payload, loading: false };

    case `${GET_POSTS_BY_USER_ID}_PENDING`:
      return { ...state, loadingPosts: true };
    case `${GET_POSTS_BY_USER_ID}_FULFILLED`:
      return {
        ...state,
        error: null,
        posts: [...state.posts, ...action.payload.data],
        loadingPosts: false
      };
    case `${GET_POSTS_BY_USER_ID}_REJECTED`:
      return { ...state, error: action.payload, loadingPosts: false };

    case `${GET_POST}_PENDING`:
      return { ...state, loading: true };
    case `${GET_POST}_FULFILLED`:
      return {
        ...state,
        error: null,
        selectedPost: action.payload.data,
        loading: false,
        userLiked: action.payload.data[0].userLiked,
        likes: action.payload.data[0].likes,
        numLikes: action.payload.data[0].numLikes
      };
    case `${GET_POST}_REJECTED`:
      return { ...state, error: action.payload, loading: false };

    case `${ADD_POST}_PENDING`:
      return { ...state, loading: true };
    case `${ADD_POST}_FULFILLED`:
      return {
        ...state,
        error: null,
        posts: action.payload.data,
        loading: false
      };
    case `${ADD_POST}_REJECTED`:
      return { ...state, error: action.payload, loading: false };

    case `${DELETE_POST}_PENDING`:
      return { ...state, loading: true };
    case `${DELETE_POST}_FULFILLED`:
      return {
        ...state,
        error: null,
        posts: action.payload.data,
        loading: false
      };
    case `${DELETE_POST}_REJECTED`:
      return { ...state, error: action.payload, loading: false };

    case `${UPDATE_POST}_PENDING`:
      return { ...state, loading: true };
    case `${UPDATE_POST}_FULFILLED`:
      return {
        ...state,
        error: null,
        posts: action.payload.data,
        loading: false
      };
    case `${UPDATE_POST}_REJECTED`:
      return { ...state, error: action.payload, loading: false };

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
