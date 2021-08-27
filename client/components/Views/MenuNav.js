/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  StyleSheet,
  View,
  Button,
  TouchableOpacity,
  Text,
  Dimensions,
  Vibration,
  ScrollView,
} from "react-native";
import { selectMenu, setItem } from "../../redux/reducers/menu";
import SwiperMenu from "./SwiperMenu";

export default function MenuNav() {
  const [open, setOpen] = useState(false);
  const { assets } = useSelector(selectMenu);
  const dispatch = useDispatch();
  const { itemPadding, windowWidth, windowHeight} = getDimensions();

  const { arScene, menuBar } = open
    ? {
        arScene: windowHeight*0.6,
        menuBar:  windowHeight*0.4,
      }
    : {
        arScene: windowHeight*0.8,
        menuBar: windowHeight*0.2,
      };

  return (
    <View
      pointerEvents="box-none"
      style={{
        position: "absolute",
        top: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        height: "100%",
        width: "100%",
      }}
    >
      <View pointerEvents="none">
        <View
          pointerEvents="auto"
          style={{
            top: 0,
            width: "100%",
            height: arScene,
          }}
        />
      </View>
      <View
        pointerEvents="auto"
        style={{
          width: "100%",
          height: menuBar,
          backgroundColor: "none",
        }}
      >
        <View
          style={{
            marginBottom: 10,
            height: windowHeight*0.25,
            width: "100%",
            backgroundColor: "none",
          }}
        >
          <SwiperMenu />
        </View>
        <View style={{ height: "100%", backgroundColor: "rgb(255, 255, 255)" }}>
          <Button
            title={"Menu"}
            onPress={() => {
              // ReactNativeHapticFeedback.trigger("impactLight", options);
              Vibration.vibrate(10, true);
              setOpen(!open);
            }}
            accessibilityLabel="Learn more about this purple button"
          />
          <ScrollView style={{ height: "100%", overflow: "hidden" }}>
            {assets.map((product) => {
              const { product_name, id } = product;
              return (
                <Button
                  key={id}
                  title={product_name}
                  onPress={() => {
                    dispatch(setItem(product));
                  }}
                  accessibilityLabel="Learn more about this purple button"
                />
              );
            })}
          </ScrollView>
        </View>
      </View>
    </View>
  );
}
