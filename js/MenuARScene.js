/* eslint-disable no-unused-vars */
"use strict";
import React, { useRef } from "react";
import { ViroARScene, ViroOmniLight } from "react-viro";

import omniLight from "../client/util/omniLight";
import Objs from "./Objs";
import Sphere from "./Sphere";

const MenuARScene = ({ pFU, setPFU, del }) => {
  const sphere = useRef({
    position: [0, -0.5, -0.5],
    rotation: [1, 1, 1],
  });
  return (
    <ViroARScene onTrackingUpdated={() => {}}>
      {omniLight.map((light, idx) => (
        <ViroOmniLight key={idx} {...light} />
      ))}
      <Sphere sphere={sphere} pFU={pFU} setPFU={setPFU} />
      <Objs del={del} />
    </ViroARScene>
  );
};

module.exports = MenuARScene;
export default MenuARScene;
