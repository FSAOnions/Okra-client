/* eslint-disable no-unused-vars */
"use strict";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Alert } from "react-native";
import { Viro3DObject } from "react-viro";

import { deleteSingleProduct } from "../client/redux/reducers/menu";

const Obj = ({ del, product }) => {
  const dispatch = useDispatch();
  const [rotation, setRotation] = useState(0);
  const [pinch, setPinch] = useState(0);

  const handlePinch = (pinchState, pinchFactor) => {
    const factor = pinchFactor / 100;
    if (pinchState == 2) {
      setPinch(Math.max(Math.min(factor, 0.5), 0));
      return;
    }
  };
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
    <Viro3DObject
      source={{
        uri: product.assets.source,
      }}
      lightReceivingBitMask={3}
      resources={[{ uri: product.assets.mtl }]}
      scale={Array(3).fill(product.assets.scale + pinch)}
      type={product.assets.type}
      onRotate={handleRotate}
      rotation={[product.assets.rotate, rotation, 0]}
      onClickState={(state) => {
        if (state === 1 && del.current.canDelete) {
          handleClick(product);
        }
        if (state === 3) {
          setPinch(0);
        }
      }}
      onPinch={handlePinch}
    />
  );
};

module.exports = Obj;
export default Obj;
