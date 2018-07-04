import axios from 'axios';

//ACTION TYPE
const GET_USER = 'GET_USER';
const GREETING_SHOWN = 'GREETING_SHOWN';
const GET_USERS = 'GET_USERS';
const GET_USERS_FOLLOWS = 'GET_USERS_FOLLOWS';
const GET_USER_PROFILE = 'GET_USER_PROFILE';
const SET_USER_IS_NEW_TO_FALSE = 'SET_USER_IS_NEW_TO_FALSE';
const ADD_PROFILE = 'ADD_PROFILE';
const UPDATE_PROFILE = 'UPDATE_PROFILE';

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
    payload: axios.get('/api/user')
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
    payload: axios.get(`/api/users?query=${query}`)
  };
};

export const getAllUsersFollows = () => {
  return {
    type: GET_USERS_FOLLOWS,
    payload: axios.get(`/api/users/follows`)
  };
};

export const getUserProfile = userid => {
  return {
    type: GET_USER_PROFILE,
    payload: axios.get(`/api/users/${userid}/profile`)
  };
};

export const setUserIsNewToFalse = () => {
  return {
    type: SET_USER_IS_NEW_TO_FALSE,
    payload: axios.get(`/api/users/isnew`)
  };
};

export const addProfile = obj => {
  return {
    type: ADD_PROFILE,
    payload: axios.post(`/api/users/profile/new`, obj)
  };
};

export const updateProfile = obj => {
  return {
    type: UPDATE_PROFILE,
    payload: axios.put(`/api/users/profile/edit`, obj)
  };
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_USER}_PENDING`:
      return { ...state, loading: true };
    case `${GET_USER}_FULFILLED`:
      return { ...state, user: action.payload.data, loading: false };

    case GREETING_SHOWN:
      return { ...state, hasDisplayedGreeting: action.payload };

    case `${GET_USERS}_PENDING`:
      return { ...state, loading: true };
    case `${GET_USERS}_FULFILLED`:
      return {
        ...state,
        error: null,
        users: action.payload.data,
        loading: false
      };
    case `${GET_USERS}_REJECTED`:
      return { ...state, error: action.payload, loading: false };

    case `${GET_USERS_FOLLOWS}_PENDING`:
      return { ...state, loading: true };
    case `${GET_USERS_FOLLOWS}_FULFILLED`:
      return {
        ...state,
        error: null,
        users: action.payload.data,
        loading: false
      };
    case `${GET_USERS_FOLLOWS}_REJECTED`:
      return { ...state, error: action.payload, loading: false };

    case `${GET_USER_PROFILE}_PENDING`:
      return { ...state, loading: true };
    case `${GET_USER_PROFILE}_FULFILLED`:
      return {
        ...state,
        error: null,
        userProfile: action.payload.data,
        loading: false
      };
    case `${GET_USER_PROFILE}_REJECTED`:
      return { ...state, error: action.payload, loading: false };

    case `${UPDATE_PROFILE}_PENDING`:
      return { ...state, loading: true };
    case `${UPDATE_PROFILE}_FULFILLED`:
      return {
        ...state,
        error: null,
        userProfile: action.payload.data,
        loading: false
      };
    case `${UPDATE_PROFILE}_REJECTED`:
      return { ...state, error: action.payload, loading: false };

    default:
      return state;
  }
}
