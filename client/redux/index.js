import { combineReducers } from "redux";

import menu from "./reducers/menu";
import userPage from "./reducers/userPage";

const rootReducer = combineReducers({
  menu,
  userPage,
});

export default rootReducer;
