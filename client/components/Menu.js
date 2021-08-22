import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, View, Button } from "react-native";
import { ViroARSceneNavigator } from "react-viro";
import ButtonComponent from "./ImageComponent";
import { selectUserPage, setPage } from "../redux/reducers/userPage";
import Hamburger from "./Hamburger";
import MenuNav from "./MenuNav";

const sharedProps = {
  apiKey: "API_KEY_HERE",
};

const InitialARScene = require("../../js/MenuARScene");

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
      <Hamburger />
      <ViroARSceneNavigator
        {...sharedProps}
        initialScene={{ scene: InitialARScene }}
      />
      <MenuNav />
    </View>
  );
}

const styles = StyleSheet.create({});
