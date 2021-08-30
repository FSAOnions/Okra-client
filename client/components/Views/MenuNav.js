/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Button, Vibration, ScrollView, Text } from "react-native";
import {
  selectMenu,
  setItem,
  fetchDrinks,
  fetchEntrees,
  fetchAppetizers,
  fetchMenu,
} from "../../redux/reducers/menu";
import SwiperMenu from "./SwiperMenu";
import getDimensions from "../../util/getDimensions";

export default function MenuNav(props) {
  const [open, setOpen] = useState(false);
  const { assets } = useSelector(selectMenu);
  const dispatch = useDispatch();
  const { itemPadding, windowHeight, windowWidth, itemWidth } = getDimensions();

  const onSnap = (index) => {
    assets.filter((asset, i) => {
      if (index === i) {
        console.log(
          `asset-Description =>: ${asset.description} || index =>: ${index} || i =>: ${i}`
        );
        return asset.description;
      }
    });
  };

  const { arScene, menuBar } = open
    ? {
        arScene: windowHeight * 0.6,
        menuBar: windowHeight * 0.4,
      }
    : {
        arScene: windowHeight * 0.82,
        menuBar: windowHeight * 0.18,
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
            marginBottom: 0,
            height: 100,

            width: "100%",
            backgroundColor: "none",
          }}
        >
          <SwiperMenu {...props} onSnap={onSnap} />
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
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Button
              title={"Appetizers"}
              onPress={() => {
                dispatch(fetchMenu());
                Vibration.vibrate(10, true);
              }}
            />
            <Button
              title={"Entrees"}
              onPress={() => {
                dispatch(fetchMenu());
                Vibration.vibrate(10, true);
              }}
            />
            <Button
              title={"Drinks"}
              onPress={() => {
                dispatch(fetchMenu());
                Vibration.vibrate(10, true);
              }}
            />
          </View>
          <ScrollView style={{ height: "100%", overflow: "hidden" }}>
            {assets.map((product, index) => {
              const { id, description } = product;
              return (
                <View>
                  <Button
                    key={id}
                    title={""}
                    onPress={() => {
                      dispatch(setItem(product));
                    }}
                    accessibilityLabel="Learn more about this purple button"
                  />
                </View>
              );
            })}
          </ScrollView>
        </View>
      </View>
    </View>
  );
}
