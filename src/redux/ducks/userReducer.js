import axios from "axios";

//ACTION TYPE
const GET_USER = "GET_USER";

//INITIAL STATE
const initialState = {
  user: {},
  loading: false
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

export default function reducer(state = initialState, action) {
  console.log("action.type: ", action.type);
  switch (action.type) {
    case `${GET_USER}_PENDING`:
      return { ...state, loading: true };
    case `${GET_USER}_FULFILLED`:
      return { ...state, user: action.payload, loading: false };
    default:
      return state;
  }
}
