import axios from "axios";

//ACTION TYPE
const GET_USER = "GET_USER";
const GREETING_SHOWN = "GREETING_SHOWN";

//INITIAL STATE
const initialState = {
  user: {},
  loading: false,
  hasDisplayedGreeting: false
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

export default function userReducer(state = initialState, action) {
  console.log("action.type: ", action.type);
  switch (action.type) {
    case `${GET_USER}_PENDING`:
      return { ...state, loading: true };
    case `${GET_USER}_FULFILLED`:
      return { ...state, user: action.payload, loading: false };
    case GREETING_SHOWN:
      return { ...state, hasDisplayedGreeting: action.payload };
    default:
      return state;
  }
}
