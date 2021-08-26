import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, View } from "react-native";
import {
  ViroARScene,
  ViroText,
  Viro3DObject,
  ViroAmbientLight,
  ViroSpotLight,
  ViroNode,
  ViroARPlaneSelector,
  ViroARPlane,
  ViroBox,
  ViroARTrackingTargets,
  ViroARImageMarker,
  ViroOmniLight,
} from "react-viro";



import { setSelected, selectMenu } from "../../redux/reducers/menu";
import { setToCart } from "../../redux/reducers/userCart";

export default CartTable = (props) => {
  const dispatch = useDispatch();
  const { assets, selected, item } = useSelector(selectMenu);


  const [rotation, setRotation] = useState([0, 0, 0]);

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

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <ViroARScene
      onTrackingUpdated={() => {
        setText("Drag and place items you'd like to order on your table");
      }}
      onClickState={(state, position, source) => {
        let newItem = Object.assign({ position }, item);
        let nodeFound = position.length === 3;
        if (nodeFound) {
          newItem.position = position;
        }
        if (!nodeFound && state === 1) {
          item.name && dispatch(setSelected(newItem));
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
      <ViroOmniLight color={"#aaaaaa"} />
      <ViroSpotLight
        innerAngle={5}
        outerAngle={90}
        direction={[0, -1, -0.2]}
        position={[0, 3, 1]}
        color="#ffffff"
        castsShadow={true}
      />

      {selected.map(
        ({ source, mtl, resources, type, scale, position }, idx) => (
          <ViroNode
            key={`${idx}-${source}`}
            position={[0, -0.5, -0.5]}
            dragType="FixedToWorld"
            onDrag={(itemId, quantity) => setToCart(itemId, quantity)}
          >
            <Viro3DObject
              source={{
                uri: source,
              }}
              resources={resources}
              lightReceivingBitMask={3}
              resources={[{ uri: mtl }]}
              scale={Array(3).fill(scale)}
              type={type}
              onRotate={handleRotate}
              rotation={rotation}
            />
          </ViroNode>
        )
      )}
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

module.exports = CartTable
export default CartTable

