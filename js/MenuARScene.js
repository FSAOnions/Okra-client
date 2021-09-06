/* eslint-disable no-unused-vars */
"use strict";
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
  ViroMaterials,
} from "react-viro";

import { selectMenu, deleteSingleProduct } from "../client/redux/reducers/menu";

const MenuARScene = ({ pFU, setPFU, del }) => {
  const dispatch = useDispatch();
  const { selected } = useSelector(selectMenu);
  const [text, setText] = useState("Initializing AR...");

  const [rotation, setRotation] = useState(0);
  const sphere = useRef({
    position: [0, -0.5, -0.5],
    rotation: [1, 1, 1],
  });

  useEffect(() => {
    ViroMaterials.createMaterials({
      red: {
        shininess: 2.0,
        lightingModel: "Lambert",
        diffuseTexture: require("../public/red.png"),
      },
    });
  }, []);

  const handleRotate = (rotateState, rotationFactor) => {
    console.log(rotation);
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
      {
        text: "OK",
        onPress: () => {
          dispatch(deleteSingleProduct(key));
        },
      },
    ]);
  };
  const intensity = 1500;
  return (
    <ViroARScene
      onTrackingUpdated={() => {
        setText();
        // `Welcome, ${
        //    user.firstName.slice(0, 1).toUpperCase() + user.firstName
        // }!`
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
        intensity={intensity}
        castsShadow={true}
      />
      <ViroSpotLight
        innerAngle={5}
        outerAngle={90}
        direction={[0, 1, -0.2]}
        position={[0, -3, 1]}
        color="#ffffff"
        intensity={intensity}
        castsShadow={false}
      />
      <ViroSpotLight
        innerAngle={5}
        outerAngle={90}
        direction={[1, 0, -0.2]}
        position={[-3, 0, 1]}
        color="#ffffff"
        intensity={intensity}
        castsShadow={false}
      />
      <ViroSpotLight
        innerAngle={5}
        outerAngle={90}
        direction={[-1, 0, -0.2]}
        position={[3, 0, 1]}
        color="#ffffff"
        intensity={intensity}
        castsShadow={false}
      />
      <ViroSphere
        heightSegmentCount={20}
        widthSegmentCount={20}
        radius={2}
        position={sphere.current.position}
        rotation={sphere.current.rotation}
        onDrag={(position) => {
          setPFU({ ...pFU, position });
        }}
        scale={[0.01, 0.01, 0.01]}
        height={1}
        width={1}
        materials={["red"]}
      />
      {selected.map((product, idx) => (
        <ViroNode
          key={`${idx}-${product.assets.source}`}
          position={product.pFU.position}
          forward={product.pFU.forward}
          up={product.pFU.up}
          dragType="FixedToWorld"
          onDrag={() => {}}
          visible={!product.removed}
        >
          {/* {rotation + product.assets.rotateY} */}
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
            onClickState={(state, touchPos, source) => {
              if (state === 1 && del.current.canDelete) {
                handleClick(product);
              }
            }}
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
