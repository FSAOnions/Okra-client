/* eslint-disable no-unused-vars */
import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import Main from "./components/interface/Main/Main";

render(
  <Provider store={store}>
    <Main />
  </Provider>,
  document.getElementById("main")
);
