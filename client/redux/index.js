import { combineReducers } from "redux";

import menu from "./reducers/menu";
import userPage from "./reducers/userPage";
import userlogIn from "./reducers/userLog"

const rootReducer = combineReducers({
  menu,
  userPage,
  userlogIn
});

export default rootReducer;
