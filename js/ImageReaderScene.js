/* eslint-disable no-unused-vars */
"use strict";
//TODO Database
///////////////////////////

////////////////////////////

const serverUrl = "https://okra-onions.herokuapp.com";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, Alert } from "react-native";
import {
  ViroARScene,
  ViroARTrackingTargets,
  ViroARImageMarker,
} from "react-viro";

import { selectMenu, fetchMenu } from "../client/redux/reducers/menu";
import { setPage } from "../client/redux/reducers/userPage";

const ImageReaderScene = (props) => {
  const dispatch = useDispatch();
  const { restaurants, menu } = useSelector(selectMenu);
  const [text, setText] = useState("Initializing AR...");
  const fetchOnce = (() => {
    let ran;
    return (id) => {
      if (!ran) {
        dispatch(fetchMenu(id));
        ran = !ran;
      }
    };
  })();

  useEffect(() => {
    restaurants.length &&
      restaurants.forEach(({ name, imgUrl }) => {
        const uri = `${serverUrl}/${imgUrl}`;
        ViroARTrackingTargets.createTargets({
          [name]: {
            source: { uri },
            orientation: "Up",
            physicalWidth: 0.1,
          },
        });
      });
  }, [restaurants.length]);

  return (
    <ViroARScene
      onTrackingUpdated={() => {
        setText("Hello World!");
      }}
    >
      {menu.assets
        ? restaurants.map((restaurant) => {
            const { name, id } = restaurant;
            return (
              <ViroARImageMarker
                key={id}
                target={name}
                onAnchorFound={(anchor) => {
                  fetchOnce(id);
                }}
              />
            );
          })
        : Alert.alert(`Menu Found`, `Go to ${name}'s menu`, [
            {
              text: "Cancel",
              onPress: () => dispatch(setPage("home")),
              style: "cancel",
            },
            {
              text: "OK",
              onPress: () => dispatch(setPage("menu")),
            },
          ])}
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
