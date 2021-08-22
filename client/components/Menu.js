import React from "react";
import { StyleSheet, View } from "react-native";
import { ViroARSceneNavigator } from "react-viro";

const sharedProps = {
  apiKey: "API_KEY_HERE",
};

const InitialARScene = require("../../js/arScene");

export default function Menu() {
  return (
    <View
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        width: "100%",
        height: "100%",
      }}
    >
      <ViroARSceneNavigator
        {...sharedProps}
        initialScene={{ scene: InitialARScene }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
