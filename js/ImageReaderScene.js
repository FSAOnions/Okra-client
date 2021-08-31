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

import {
  selectMenu,
  fetchMenu,
  setRestaurant,
} from "../client/redux/reducers/menu";
import { setPage } from "../client/redux/reducers/userPage";

const ImageReaderScene = (props) => {
  const dispatch = useDispatch();
  const { restaurants, menu, currentRestaurant } = useSelector(selectMenu);
  const [text, setText] = useState("Initializing AR...");
  const fetchOnce = (() => {
    let ran;
    return (idx, id) => {
      if (!ran) {
        dispatch(setRestaurant(restaurants[idx]));
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
      {currentRestaurant.id
        ? Alert.alert(`Menu Found`, `Go to ${currentRestaurant.name}'s menu`, [
            {
              text: "Cancel",
              onPress: () => dispatch(setPage("home")),
              style: "cancel",
            },
            {
              text: "OK",
              onPress: () => dispatch(setPage("menu")),
            },
          ])
        : restaurants.map((restaurant, idx) => {
            const { name, id } = restaurant;
            return (
              <ViroARImageMarker
                key={id}
                target={name}
                onAnchorFound={(anchor) => {
                  fetchOnce(idx, id);
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
