/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, View } from "react-native";
import { ViroARSceneNavigator } from "react-viro";
import Hamburger from "../Views/Hamburger";
import MenuNav from "../Views/MenuNav";
const initScene = require("../../../js/MenuARScene");
import MenuOverlay from "../Views/MenuOverlay";
import Trashcan from "../Views/Trashcan";
import Queue from "../../util/queue";
export default function ARMenu() {
  const [pFU, setPFU] = useState({
    position: [0, -0.5, -0.5],
    forward: [0, 0, 0],
    up: [0, 0, 0],
  });
  const [disabled, setDisabled] = useState(false);
  const props = {
    pFU,
    setPFU,
    setDisabled,
  };
  const onLoad = (data) => console.log("Grabbed", data);
  const q = new Queue(onLoad);
  const [canDelete, setDelete] = useState(false);
  const delProps = { canDelete, setDelete };
  const del = useRef({ canDelete: false });

  useEffect(() => {
    del.current.canDelete = canDelete;
  }, [canDelete]);

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
      <Hamburger uri="home.png" page="home" marg={37}/>
      <MenuOverlay />
      <Trashcan {...delProps} />
      <ViroARSceneNavigator
        initialScene={{
          scene: initScene,
          passProps: { ...props, del },
        }}
      />
      <MenuNav {...props} />
    </View>
  );
}

const styles = StyleSheet.create({});
