/* eslint-disable no-unused-vars */
"use strict";
import React, { useEffect, useState } from "react";
import { ViroSphere, ViroMaterials } from "react-viro";

const Sphere = ({ pFU, setPFU, sphere }) => {
  const [pinch, setPinch] = useState(0);
  const handlePinch = (pinchState, pinchFactor) => {
    const factor = pinchFactor / 100;
    if (pinchState == 2) {
      setPinch(Math.max(Math.min(factor, 0.5), 0));
      return;
    }
  };
  useEffect(() => {
    ViroMaterials.createMaterials({
      red: {
        shininess: 2.0,
        lightingModel: "Lambert",
        diffuseTexture: require("../public/red.png"),
      },
    });
  }, []);
  return (
    <ViroSphere
      heightSegmentCount={20}
      widthSegmentCount={20}
      height={1}
      width={1}
      radius={2}
      scale={Array(3).fill(0.01 + pinch)}
      materials={["red"]}
      position={sphere.current.position}
      rotation={sphere.current.rotation}
      onDrag={(position) => {
        setPFU({ ...pFU, position });
      }}
      onClickState={(state) => {
        if (state === 3) {
          setPinch(0);
        }
      }}
      onPinch={handlePinch}
    />
  );
};

module.exports = Sphere;
export default Sphere;
