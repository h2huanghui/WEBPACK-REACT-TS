import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import userInfoReducer from "./userInfoReducer";

const createCombineReducers = (history) =>
  combineReducers({
    router: connectRouter(history),
    user: userInfoReducer,
  });

export default createCombineReducers;
