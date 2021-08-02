import isLogged from "./isLogged";
import tokenReducer from "./token";
import userReducer from "./user";
import accessTokenReducer from "./access";
import loadingReducer from "./loading";
import { combineReducers } from "redux";

const allReducer = combineReducers({
  isLogged,
  tokenReducer,
  userReducer,
  accessTokenReducer,
  loadingReducer
});

export default allReducer;
