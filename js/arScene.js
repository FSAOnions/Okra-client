/* eslint-disable no-unused-vars */
"use strict";

import React, { Component, useState, useEffect, Fragment } from "react";
import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import {
  ViroARScene,
  ViroText,
  ViroMaterials,
  ViroBox,
  Viro3DObject,
  ViroAmbientLight,
  ViroSpotLight,
  ViroARPlaneSelector,
  ViroNode,
  ViroAnimations,
  ViroARSceneNavigator,
} from "react-viro";
//var createReactClass = require("create-react-class");
import store from "../client/redux/store";

const ARScene = ({ testing }) => {
  useEffect(() => {
    const testingHack = store.getState().auth.auth.weAreSmart;
    console.log("Are we Smart?", testingHack, testing);
  }, []);
  const [text, setText] = useState("Initializing AR...");
  const [scale, setScale] = useState(0.01);
  const handlePinch = (pinchState, scaleFactor, source) => {
    if (pinchState === 3) {
      //setScale(scale * scaleFactor);
    } else if (pinchState === 2) {
      setScale(scale * scaleFactor);
    }
  };
  return (
    <ViroARScene
      onTrackingUpdated={() => {
        setText("Hello World!");
      }}
    >
      <ViroText
        text={text}
        scale={[0.1, 0.1, 0.1]}
        height={1}
        width={4}
        position={[0, 0.5, -1]}
        style={styles.helloWorldTextStyle}
      />

      <ViroAmbientLight color={"#aaaaaa"} />
      <ViroSpotLight
        innerAngle={5}
        outerAngle={90}
        direction={[0, -1, -0.2]}
        position={[0, 3, 1]}
        color="#ffffff"
        castsShadow={true}
      />

      <ViroNode
        position={[0, -0.5, -1.5]}
        dragType="FixedToWorld"
        onDrag={() => {}}
      >
        <Viro3DObject
          source={require("./res/CoffeeCup/obj/coffee_cup.obj")}
          resources={[
            require("./res/CoffeeCup/obj/coffee_cup.mtl"),
            require("./res/CoffeeCup/rend/1st rend.png"),
            require("./res/CoffeeCup/rend/2nd rend.png"),
            require("./res/CoffeeCup/rend/3rd rend.png"),
            require("./res/CoffeeCup/rend/3th rend.png"),
            require("./res/CoffeeCup/rend/4th rend.png"),
            require("./res/CoffeeCup/rend/6th rend.png"),
            require("./res/CoffeeCup/tex/cap roughness.jpeg"),
            require("./res/CoffeeCup/tex/coffee cup.jpg"),
          ]}
          scale={[scale, scale, scale]}
          type="OBJ"
          onPinch={handlePinch}
        />
      </ViroNode>
    </ViroARScene>
  );
};

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: "Arial",
    fontSize: 50,
    color: "#ffffff",
    textAlignVertical: "center",
    textAlign: "center",
  },
});

const mapStateToProps = (state) => {
  const { auth } = state.auth;
  return {
    testing: "fuck",
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

console.log(
  "This is the connect object",
  connect(mapStateToProps, null)(ARScene)
);
module.exports = connect(mapStateToProps, null)(ARScene).WrappedComponent;
export default connect(mapStateToProps, null)(ARScene);
