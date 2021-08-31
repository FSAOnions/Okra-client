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
  const { restaurants, assets } = useSelector(selectMenu);
  const [text, setText] = useState("Initializing AR...");
  const [seen, setSeen] = useState(false);
  const once = () => {
    let run = true;
    return (id) => {
      if (run) {
        dispatch(fetchMenu(id));
        run = false;
      }
    };
  };
  const [run, setRun] = useState(once());

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
    setSeen(true);
  }, []);

  return (
    <ViroARScene
      onTrackingUpdated={() => {
        setText("Hello World!");
      }}
    >
      {seen &&
        restaurants.map((restaurant) => {
          const { name, id } = restaurant;
          console.log({ name }, { id });
          return (
            <ViroARImageMarker
              key={id}
              target={name}
              onAnchorFound={(anchor) => {
                const inside = once();
                inside(id);
                Alert.alert(`Menu Found`, `Go to ${name}'s menu`, [
                  {
                    text: "Cancel",
                    onPress: () => dispatch(setPage("home")),
                    style: "cancel",
                  },
                  {
                    text: "OK",
                    onPress: () => {
                      dispatch(setPage("menu"));
                    },
                  },
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
