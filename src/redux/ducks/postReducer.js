import axios from "axios";

//ACTION TYPE
const GET_POSTS = "GET_POSTS";

//INITIAL STATE
const initialState = {
  posts: [],
  loading: false,
  error: null
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
    default:
      return state;
  }
}
