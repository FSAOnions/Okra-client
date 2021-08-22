/* eslint-disable no-unused-vars */
"use strict";

const localHost = "http://10.0.0.206:8080";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, View, YellowBox, Alert } from "react-native";
import {
  ViroARScene,
  ViroText,
  Viro3DObject,
  ViroAmbientLight,
  ViroSpotLight,
  ViroNode,
  ViroARPlaneSelector,
  ViroARPlane,
  ViroBox,
  ViroARTrackingTargets,
  ViroARImageMarker,
} from "react-viro";

const initTargets = [
  { name: "targetOne", uri: `${localHost}/CoffeeCup/obj/coffee_cup.jpg` },
];

import {
  proofOfThunk,
  selectMenu,
  setProof,
} from "../client/redux/reducers/menu";
import { setPage } from "../client/redux/reducers/userPage";
import { setSelected } from "../client/redux/reducers/menu";

const ImageReaderScene = (props) => {
  const dispatch = useDispatch();
  const { assets, proof, selected, item } = useSelector(selectMenu);

  const [text, setText] = useState("Initializing AR...");
  const [targets, setTargets] = useState(initTargets);

  useEffect(() => {
    initTargets.forEach(({ name, uri }) => {
      ViroARTrackingTargets.createTargets({
        [name]: {
          source: { uri },
          orientation: "Up",
          physicalWidth: 0.1,
        },
      });
    });
  }, []);

  return (
    <ViroARScene
      onTrackingUpdated={() => {
        setText("Hello World!");
      }}
    >
      {targets &&
        targets.map(({ name }) => {
          return (
            <ViroARImageMarker
              target={name}
              onAnchorFound={(anchor) => {
                console.log(
                  "Target",
                  "22D8F0F0-72E2-6661-7B81-F190D1B4614E",
                  name,
                  anchor
                );
                Alert.alert(`Menu Found`, `Go to ${name}'s menu`, [
                  {
                    text: "Cancel",
                    onPress: () => dispatch(setPage("home")),
                    style: "cancel",
                  },
                  { text: "OK", onPress: () => dispatch(setPage("menu")) },
                ]);
              }}
            />
          );
        })}
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

module.exports = ImageReaderScene;
export default ImageReaderScene;
