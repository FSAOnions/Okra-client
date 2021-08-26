/* eslint-disable no-unused-vars */
/**
 * Copyright (c) 2017-present, Viro, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React from "react";
import { Provider } from "react-redux";
import store from "./client/redux/store";
import Routes from "./client/components/Routes";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, Layout } from "@ui-kitten/components";
import { default as theme } from "./client/util/custom-theme.json";

export default function Main() {
  return (
    <Provider store={store}>
      <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
        <Layout
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Routes />
        </Layout>
      </ApplicationProvider>
    </Provider>
  );
}

module.exports = Main;
