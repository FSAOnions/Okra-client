/* eslint-disable no-unused-vars */
"use strict";
import React, { useEffect } from "react";
import { ViroSphere, ViroMaterials } from "react-viro";

const Sphere = ({ pFU, setPFU, sphere }) => {
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
      scale={[0.01, 0.01, 0.01]}
      materials={["red"]}
      position={sphere.current.position}
      rotation={sphere.current.rotation}
      onDrag={(position) => {
        setPFU({ ...pFU, position });
      }}
    />
  );
};

module.exports = Sphere;
export default Sphere;
