/* eslint-disable no-unused-vars */
"use strict";

const localHost = "http://10.0.0.206:8080";
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
} from "react-viro";

import {
  proofOfThunk,
  selectMenu,
  setProof,
  fetchProducts,
  deleteSingleProduct,
} from "../client/redux/reducers/menu";
import { selectUser } from "../client/redux/reducers/user";

const MenuARScene = ({ pFU, setPFU, del }) => {
  const dispatch = useDispatch();
  const { selected } = useSelector(selectMenu);
  const user = useSelector(selectUser);
  const [text, setText] = useState("Initializing AR...");
  const [rotation, setRotation] = useState(0);
  let sceneRef = useRef();

  const handleRotate = (rotateState, rotationFactor) => {
    const factor = rotationFactor / 2;
    if (rotateState == 2) {
      setRotation(rotation + Math.max(Math.min(factor, 10), -10));
      return;
    }
  };

  const handleClick = ({ key }) => {
    Alert.alert("Are you sure?", "Delete this item from your cart.", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => dispatch(deleteSingleProduct(key)) },
    ]);
  };

  return (
    <ViroARScene
      onTrackingUpdated={() => {
        setText(
          `Welcome, ${
            user.firstName.slice(0, 1).toUpperCase() + user.firstName.slice(1)
          }!`
        );
      }}
      ref={(scene) => (sceneRef = scene)}
      // onCameraTransformUpdate={async () => {
      //   const { position, forward, up } =
      //     await sceneRef.getCameraOrientationAsync();
      //   const [x, y, z] = position;
      //   0, -0.5, -0.5;
      //   setPFU({ position: [x, -0.5 + y, -0.5 + z], forward, up });
      // }}
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
          forward={product.pFU.forward}
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
            rotation={[product.assets.rotate, rotation, 0]}
            onClick={(state, touchPos, source) =>
              del.current.canDelete ? handleClick(product) : null
            }
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
