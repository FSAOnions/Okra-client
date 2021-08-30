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
  fetchAllRestaurants,
} from "../client/redux/reducers/menu";
import { setPage } from "../client/redux/reducers/userPage";

const ImageReaderScene = (props) => {
  const dispatch = useDispatch();
  const { restaurants } = useSelector(selectMenu);
  const [text, setText] = useState("Initializing AR...");

  useEffect(() => {
    console.log("UseEffect", restaurants);
    restaurants.forEach(({ name, imgUrl }) => {
      const uri = `${serverUrl}/${imgUrl}`;
      ViroARTrackingTargets.createTargets({
        [name]: {
          source: { uri },
          orientation: "Up",
          physicalWidth: 0.1,
        },
        // .addCase(fetchMenu.fulfilled, (state, action) => {
        //   state.assets = action.payload;
        // }),
      });
    });
  }, []);

  const mappedRestaurants = restaurants.map((rest) => {
    return `${rest.name} ${rest.id}`;
  });

  console.log({ mappedRestaurants });

  return (
    <ViroARScene
      onTrackingUpdated={() => {
        setText("Hello World!");
      }}
    >
      {restaurants.map((restaurant) => {
        return (
          <ViroARImageMarker
            key={restaurant.id}
            target={restaurant.name}
            onAnchorFound={(anchor) => {
              console.log("this is restaurant.id => ", restaurant.id);
              Alert.alert(`Menu Found`, `Go to ${restaurant.name}'s menu`, [
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
