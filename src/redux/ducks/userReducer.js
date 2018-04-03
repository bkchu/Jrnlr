import axios from "axios";

//ACTION TYPE
const GET_USER = "GET_USER";
const GREETING_SHOWN = "GREETING_SHOWN";
const GET_USERS = "GET_USERS";

//INITIAL STATE
const initialState = {
  user: null,
  loading: false,
  hasDisplayedGreeting: false,
  users: [],
  error: null
};

//ACTION CREATOR
export const getUser = () => {
  return {
    type: GET_USER,
    payload: axios
      .get("/api/user")
      .then(response => response.data)
      .catch(err => console.log(err))
  };
};

export const displayedGreeting = bool => {
  return {
    type: GREETING_SHOWN,
    payload: bool
  };
};

export const getUsers = query => {
  return {
    type: GET_USERS,
    payload: axios
      .get(`/api/users?query=${query}`)
      .then(response => response.data)
      .catch(err => {
        if (err.response) {
          return err.response;
        }
      })
  };
};

export default function userReducer(state = initialState, action) {
  console.log("action.type: ", action.type);
  switch (action.type) {
    case `${GET_USER}_PENDING`:
      return { ...state, loading: true };
    case `${GET_USER}_FULFILLED`:
      return { ...state, user: action.payload, loading: false };
    case GREETING_SHOWN:
      return { ...state, hasDisplayedGreeting: action.payload };

    case `${GET_USERS}_PENDING`:
      return { ...state, loading: true };
    case `${GET_USERS}_FULFILLED`:
      if (Array.isArray(action.payload)) {
        return { ...state, error: null, users: action.payload, loading: false };
      } else {
        return { ...state, error: action.payload, loading: false };
      }

    default:
      return state;
  }
}
