/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, View, Button } from "react-native";
import { useDispatch } from "react-redux";
import { ViroARSceneNavigator, ViroARScene } from "react-viro";
import { fetchProducts } from "../../redux/reducers/menu";
import { setScene } from "../../redux/reducers/userPage";
// import { selectUserPage, setPage } from "../../redux/reducers/userPage";
import Hamburger from "../Views/Hamburger";
import MenuNav from "../Views/MenuNav";
const initScene = require("../../../js/MenuARScene");

export default function ARMenu() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);
  const [pFU, setPFU] = useState({
    position: [0, -0.5, -0.5],
    forward: [0, 0, 0],
    up: [0, 0, 0],
  });
  const props = {
    pFU,
    setPFU,
  };
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
        initialScene={{ scene: initScene, passProps: { ...props } }}
      />
      <MenuNav {...props} />
    </View>
  );
}

const styles = StyleSheet.create({});
