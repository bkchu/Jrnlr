import { createStore, applyMiddleware, combineReducers } from "redux";
import promiseMiddleware from "redux-promise-middleware";

import userReducer from "./ducks/userReducer";
import postReducer from "./ducks/postReducer";
import followReducer from "./ducks/followReducer";
import likeReducer from "./ducks/likeReducer";

export default createStore(
  combineReducers({ userReducer, postReducer, followReducer, likeReducer }),
  applyMiddleware(promiseMiddleware())
);
