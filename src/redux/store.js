import { createStore, applyMiddleware, combineReducers } from "redux";
import promiseMiddleware from "redux-promise-middleware";

import userReducer from "./ducks/userReducer";
import postReducer from "./ducks/postReducer";

export default createStore(
  combineReducers({ userReducer, postReducer }),
  applyMiddleware(promiseMiddleware())
);
