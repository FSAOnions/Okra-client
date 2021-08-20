// import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "./reducers/auth";

// export const store = configureStore({
//   reducer: {
//     auth: authReducer,
//   },
// });

import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./index";

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(rootReducer, middleware);

export default store;
