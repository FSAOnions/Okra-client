/* eslint-disable no-unused-vars */
"use strict";
import React from "react";
import { useSelector } from "react-redux";
import { ViroNode } from "react-viro";

import { selectMenu } from "../client/redux/reducers/menu";
import Obj from "./Obj";

const Objs = ({ del }) => {
  const { selected } = useSelector(selectMenu);
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
          <Obj del={del} product={product} />
        </ViroNode>
      ))}
    </>
  );
};

module.exports = Objs;
export default Objs;
