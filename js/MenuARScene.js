/* eslint-disable no-unused-vars */
"use strict";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, Alert } from "react-native";
import {
  ViroARScene,
  ViroText,
  Viro3DObject,
  ViroSpotLight,
  ViroNode,
  ViroOmniLight,
  ViroSphere,
  ViroMaterials,
} from "react-viro";

import { selectMenu, deleteSingleProduct } from "../client/redux/reducers/menu";
import omniLight from "../client/util/omniLight";
import ThreeDObjs from "./ThreeDObjs";
import Sphere from "./Sphere";

const MenuARScene = ({ pFU, setPFU, del }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState("Initializing AR...");

  const sphere = useRef({
    position: [0, -0.5, -0.5],
    rotation: [1, 1, 1],
  });

  return (
    <ViroARScene
      onTrackingUpdated={() => {
        setText();
      }}
    >
      <ViroText
        text={text}
        scale={[0.1, 0.1, 0.1]}
        height={1}
        width={4}
        position={[0, 0.5, -1]}
        style={styles.textStyle}
      />
      {omniLight.map((light) => (
        <ViroOmniLight {...light} />
      ))}
      <Sphere sphere={sphere} pFU={pFU} setPFU={setPFU} />
      <ThreeDObjs del={del} />
    </ViroARScene>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontFamily: "Arial",
    fontSize: 50,
    color: "#ffffff",
    textAlignVertical: "center",
    textAlign: "center",
  },
  screenIcon: {
    position: "absolute",
    height: 58,
    width: 58,
  },
});

module.exports = MenuARScene;
export default MenuARScene;
