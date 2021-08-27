/* eslint-disable no-unused-vars */
"use strict";

import React, { useState } from "react";
import { StyleSheet, View, YellowBox } from "react-native";
import { ViroARScene } from "react-viro";

const ViroScene = () => {
  const [text, setText] = useState("Initializing AR...");
  return (
    <ViroARScene
      onTrackingUpdated={() => {
        setText("Hello World!");
      }}
    ></ViroARScene>
  );
};

const styles = StyleSheet.create({});

module.exports = ViroScene;
export default ViroScene;
