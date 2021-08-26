import { combineReducers } from "redux";

import menu from "./reducers/menu";
import userPage from "./reducers/userPage";
import user from "./reducers/user"

const rootReducer = combineReducers({
  menu,
  userPage,
  user
});

export default rootReducer;
