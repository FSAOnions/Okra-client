/* eslint-disable no-unused-vars */
import React from "react";
("react-redux");
import {
  StyleSheet,
  View,
  Text,
  Button,
  Image,
  ImageBackground,
} from "react-native";
import { ViroARSceneNavigator } from "react-viro";
import Hamburger from "./Hamburger";

const InitialARScene = require("../../js/ImageReaderScene");

export default function ARScanner() {
  return (
    <View style={styles.scanner}>
      <Hamburger />
      <View
        style={{
          position: "absolute",
          top: 0,
          flex: 1,
          justifyContent: "flex-end",
          alignItems: "center",
          height: "0%",
          paddingTop: 400,
          width: "100%",
          backgroundColor: "none",
        }}
      ></View>
      <ViroARSceneNavigator initialScene={{ scene: InitialARScene }} />

      <Text style={styles.headline}>Searching for Restaurants...</Text>
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
    fontSize: 20,
    textAlign: "center",
    backgroundColor: "transparent",
    color: "black",
  },
  scanner: {
    width: "100%",
    height: "100%",
  },
});
