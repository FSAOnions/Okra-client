/* eslint-disable no-unused-vars */
"use strict";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, Alert } from "react-native";
import { Viro3DObject, ViroNode } from "react-viro";

import { selectMenu, deleteSingleProduct } from "../client/redux/reducers/menu";
import omniLight from "../client/util/omniLight";

const ThreeDObjs = ({ del }) => {
  const dispatch = useDispatch();
  const { selected } = useSelector(selectMenu);

  const [rotation, setRotation] = useState(0);

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
      {
        text: "OK",
        onPress: () => {
          dispatch(deleteSingleProduct(key));
        },
      },
    ]);
  };
  return (
    <>
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
            onClickState={(state) => {
              if (state === 1 && del.current.canDelete) {
                handleClick(product);
              }
            }}
          />
        </ViroNode>
      ))}
    </>
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

module.exports = ThreeDObjs;
export default ThreeDObjs;
