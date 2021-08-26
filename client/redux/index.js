import { combineReducers } from "redux";

import menu from "./reducers/menu";
import userPage from "./reducers/userPage";
import userCart from "./reducers/userCart";

const rootReducer = combineReducers({
  menu,
  userPage,
  userCart,
});

export default rootReducer;
