import axios from "axios";

//ACTION TYPE
const GET_USER = "GET_USER";
const GREETING_SHOWN = "GREETING_SHOWN";
const GET_USERS = "GET_USERS";
const GET_USERS_FOLLOWS = "GET_USERS_FOLLOWS";
const GET_USER_PROFILE = "GET_USER_PROFILE";
const SET_USER_IS_NEW_TO_FALSE = "SET_USER_IS_NEW_TO_FALSE";
const ADD_PROFILE = "ADD_PROFILE";

//INITIAL STATE
const initialState = {
  user: null,
  loading: false,
  hasDisplayedGreeting: false,
  users: [],
  error: null,
  userProfile: null
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

export const getAllUsersFollows = () => {
  return {
    type: GET_USERS_FOLLOWS,
    payload: axios
      .get(`/api/users/follows`)
      .then(response => response.data)
      .catch(err => {
        if (err.response) {
          return err.response;
        }
      })
  };
};

export const getUserProfile = userid => {
  return {
    type: GET_USER_PROFILE,
    payload: axios
      .get(`/api/users/${userid}/profile`)
      .then(response => response.data)
      .catch(err => {
        if (err.response) {
          return err.response;
        }
      })
  };
};

export const setUserIsNewToFalse = () => {
  return {
    type: SET_USER_IS_NEW_TO_FALSE,
    payload: axios
      .get(`/api/users/isnew`)
      .then(response => response.data)
      .catch(err => {
        if (err.response) {
          return err.response;
        }
      })
  };
};

export const addProfile = obj => {
  return {
    type: ADD_PROFILE,
    payload: axios
      .post(`/api/users/profile/new`, obj)
      .then(response => response.data)
      .catch(err => {
        if (err.response) {
          return err.response;
        }
      })
  };
};

export default function userReducer(state = initialState, action) {
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
    case `${GET_USERS_FOLLOWS}_PENDING`:
      return { ...state, loading: true };
    case `${GET_USERS_FOLLOWS}_FULFILLED`:
      if (Array.isArray(action.payload)) {
        return { ...state, error: null, users: action.payload, loading: false };
      } else {
        return { ...state, error: action.payload, loading: false };
      }

    case `${GET_USER_PROFILE}_PENDING`:
      return { ...state, loading: true };
    case `${GET_USER_PROFILE}_FULFILLED`:
      if (Array.isArray(action.payload)) {
        return {
          ...state,
          error: null,
          userProfile: action.payload,
          loading: false
        };
      } else {
        return { ...state, error: action.payload, loading: false };
      }

    default:
      return state;
  }
}
