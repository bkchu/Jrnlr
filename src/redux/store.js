import { createStore, applyMiddleware, combineReducers } from "redux";
import promiseMiddleware from "redux-promise-middleware";

import userReducer from "./ducks/userReducer";
import postReducer from "./ducks/postReducer";
import followReducer from "./ducks/followReducer";

export default createStore(
  combineReducers({ userReducer, postReducer, followReducer }),
  applyMiddleware(promiseMiddleware())
);
