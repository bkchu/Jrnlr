import axios from "axios";

//ACTION TYPE
const TOGGLE_LIKE = "TOGGLE_LIKE";

const initialState = {
  error: null,
  loading: false
};

export const toggleLike = (postid, userLiked) => {
  return {
    type: TOGGLE_LIKE,
    payload: userLiked
      ? axios
          .post(`/api/likes/${postid}`)
          .then(response => response.data)
          .catch(err => {
            if (err.response) {
              return err.response;
            }
          })
      : axios
          .delete(`/api/likes/${postid}`)
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
    case `${TOGGLE_LIKE}_PENDING`:
      return { ...state, loading: true, error: null };
    case `${TOGGLE_LIKE}_FULFILLED`:
      if (Array.isArray(action.payload)) {
        return { ...state, loading: false, error: null };
      } else {
        return { ...state, loading: false, error: action.payload };
      }
    default:
      return state;
  }
}
