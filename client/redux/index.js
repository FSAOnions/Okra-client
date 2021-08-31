import { combineReducers } from "redux";

import menu from "./reducers/menu";
import userPage from "./reducers/userPage";
import user from "./reducers/user";
import bill from "./reducers/bill";

const rootReducer = combineReducers({
  menu,
  userPage,
  user,
  bill,
});

export default rootReducer;
