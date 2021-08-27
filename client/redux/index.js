import { combineReducers } from "redux";

import menu from "./reducers/menu";
import userPage from "./reducers/userPage";
import user from "./reducers/user"
import userCart from "./reducers/userCart";

const rootReducer = combineReducers({
  menu,
  userPage,
  user,
  userCart,
});

export default rootReducer;
