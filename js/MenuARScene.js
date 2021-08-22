/* eslint-disable no-unused-vars */
"use strict";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, View, YellowBox } from "react-native";
import {
  ViroARScene,
  ViroText,
  Viro3DObject,
  ViroAmbientLight,
  ViroSpotLight,
  ViroNode,
} from "react-viro";

import {
  proofOfThunk,
  selectMenu,
  setProof,
} from "../client/redux/reducers/menu";
import { setPage } from "../client/redux/reducers/userPage";
import { setSelected } from "../client/redux/reducers/menu";

const MenuARScene = (props) => {
  const dispatch = useDispatch();
  const { assets, proof, selected, item } = useSelector(selectMenu);

  const [text, setText] = useState("Initializing AR...");
  const [rotation, setRotation] = useState([0, 0, 0]);

  useEffect(() => {
    if (!proof.message) {
      dispatch(proofOfThunk("this is proof"));
    } else {
      dispatch(setProof());
    }
  }, [proof.message]);

  const handleRotate = (rotateState, rotationFactor) => {
    const factor = rotationFactor / 2;
    if (rotateState == 2) {
      setRotation([
        rotation[0],
        rotation[1] + Math.max(Math.min(factor, 10), -10),
        rotation[2],
      ]);
      return;
    }
  };

  return (
    <ViroARScene
      onTrackingUpdated={() => {
        setText("Hello World!");
      }}
      // physicsWorld={{ gravity: [0, -9.81, 0] }}
      onClickState={(state, position, source) => {
        let newItem = Object.assign({ position }, item);
        console.log("Hello", position, source);
        let nodeFound = position.length === 3;
        if (nodeFound) {
          newItem.position = position;
          console.log("Hello2", newItem, source);
        }
        if (!nodeFound && state === 1) {
          dispatch(setSelected(newItem));
        }
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
      <ViroAmbientLight color={"#aaaaaa"} />
      <ViroSpotLight
        innerAngle={5}
        outerAngle={90}
        direction={[0, -1, -0.2]}
        position={[0, 3, 1]}
        color="#ffffff"
        castsShadow={true}
      />

      {selected.map(({ source, mtl, type, scale, position }, idx) => (
        <ViroNode
          key={`${idx}-${source}`}
          position={[0, -0.5, -0.5]}
          dragType="FixedToWorld"
          onDrag={() => {}}
        >
          <Viro3DObject
            source={{
              uri: source,
            }}
            lightReceivingBitMask={3}
            resources={[{ uri: mtl }]}
            scale={Array(3).fill(scale)}
            type={type}
            onRotate={handleRotate}
            rotation={rotation}
          />
        </ViroNode>
      ))}
      {/* <ViroText
        text={"Go Back"}
        scale={[0.1, 0.1, 0.1]}
        height={1}
        width={4}
        position={[0, 0, 0]}
        style={styles.textStyle}
        onClick={() => dispatch(setPage("home"))}
      /> */}
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
