/* eslint-disable no-unused-vars */
"use strict";

const localHost = "http://10.0.0.206:8080";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, View, YellowBox } from "react-native";
import {
  ViroARScene,
  ViroText,
  Viro3DObject,
  ViroSpotLight,
  ViroNode,
  ViroOmniLight,
} from "react-viro";

import {
  proofOfThunk,
  selectMenu,
  setProof,
  fetchProducts,
} from "../client/redux/reducers/menu";

const MenuARScene = ({ pFU, setPFU }) => {
  const { selected } = useSelector(selectMenu);
  const [text, setText] = useState("Initializing AR...");
  const [rotation, setRotation] = useState([0, 0, 0]);
  let sceneRef = useRef();

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
      ref={(scene) => (sceneRef = scene)}
      onCameraTransformUpdate={async () => {
        const { position, forward, up } =
          await sceneRef.getCameraOrientationAsync();
        const [x, y, z] = position;
        0, -0.5, -0.5;
        setPFU({ position: [x, -0.5 + y, -0.5 + z], forward, up });
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
      <ViroOmniLight color={"#aaaaaa"} />
      <ViroSpotLight
        innerAngle={5}
        outerAngle={90}
        direction={[0, -1, -0.2]}
        position={[0, 3, 1]}
        color="#ffffff"
        castsShadow={true}
      />
      {selected.map((product, idx) => (
        <ViroNode
          key={`${idx}-${product.assets.source}`}
          position={product.pFU.position}
          foward={product.pFU.foward}
          up={product.pFU.up}
          dragType="FixedToWorld"
          onDrag={() => {}}
        >
          <Viro3DObject
            source={{
              uri: product.assets.source,
            }}
            lightReceivingBitMask={3}
            resources={[{ uri: product.assets.mtl }]}
            scale={Array(3).fill(product.assets.scale)}
            type={product.assets.type}
            onRotate={handleRotate}
            rotation={rotation}
          />
        </ViroNode>
      ))}
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
