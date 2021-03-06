/* eslint-disable no-unused-vars */
import React from "react";
("react-redux");

import { StyleSheet, View, Text } from "react-native";
import { ViroARSceneNavigator } from "react-viro";
import Hamburger from "../Views/Utils/Hamburger";

export default function ARScanner() {
  return (
    <View style={styles.scanner}>
      <Hamburger uri="home.png" page="home" />
      <View
        style={{
          position: "absolute",
          top: 0,
          flex: 1,
          justifyContent: "flex-end",
          alignItems: "center",
          height: "0%",
          paddingTop: "50%",
          width: "100%",
          opacity: 0.3,
          backgroundColor: "black",
        }}
      ></View>
      <ViroARSceneNavigator
        initialScene={{ scene: require("../../../js/ImageReaderScene") }}
      />
      <Text style={styles.headline}>Point camera at Image</Text>
    </View>
  );
}

var styles = StyleSheet.create({
  container: {
    position: "absolute",
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "transparent",
    width: "100%",
    height: "100%",
  },
  backdrop: {
    width: "100%",
    height: "100%",
  },
  backdropView: {
    position: "absolute",
    top: 0,
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    height: "50%",
    width: "100%",
  },
  headline: {
    position: "absolute",
    bottom: 0,
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    height: "50%",
    width: "100%",
    fontSize: 26,
    opacity: 0.5,
    textAlign: "center",
    backgroundColor: "black",
    color: "rgba(255, 255, 255, 1)",
  },
  scanner: {
    width: "100%",
    height: "100%",
  },
});
