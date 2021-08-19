/* eslint-disable no-unused-vars */
import { AppRegistry } from "react-native";
import App from "./App.js";
import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import store from "./client/redux/store";

const Main = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

AppRegistry.registerComponent("ViroSample", () => Main);

// The below line is necessary for use with the TestBed App
AppRegistry.registerComponent("ViroSample", () => Main);
