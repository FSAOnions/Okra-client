/* eslint-disable no-unused-vars */
"use strict";
//TODO Database
///////////////////////////

////////////////////////////

const localHost = "http://10.0.0.206:8080";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, Alert } from "react-native";
import {
  ViroARScene,
  ViroARTrackingTargets,
  ViroARImageMarker,
} from "react-viro";

import { selectMenu } from "../client/redux/reducers/menu";
import { setPage } from "../client/redux/reducers/userPage";

const initTargets = [
  { name: "targetOne", uri: `${localHost}/CoffeeCup/obj/coffee_cup.jpg` },
  { name: "targetTwo", uri: `${localHost}/logo.jpeg` },
  { name: "Me", uri: `${localHost}/all_love.jpeg` },
];
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
      {targets.map(({ name }) => {
        return (
          <ViroARImageMarker
            target={name}
            onAnchorFound={(anchor) => {
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
