import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  StyleSheet,
  View,
  Button,
  TouchableOpacity,
  Text,
  Dimensions,
} from "react-native";

import { selectMenu, setSelected, setItem } from "../redux/reducers/menu";

export default function MenuNav() {
  const [open, setOpen] = useState(false);
  const [swipeFactor, setSwipeFactor] = useState(0);
  const [touching, setTouching] = useState(false);
  const { assets } = useSelector(selectMenu);
  const dispatch = useDispatch();
  const [currentSelection, setCurrentSelection] = useState({});

  // const { arScene, menuBar } = open
  //   ? {
  //       arScene: `${swipeFactor > 0 ? 70 - swipeFactor : 70}%`,
  //       menuBar: `${swipeFactor < 0 ? 30 + swipeFactor : 30}%`,
  //     }
  //   : {
  //       arScene: `${swipeFactor < 0 ? 90 + swipeFactor : 90}%`,
  //       menuBar: `${swipeFactor < 0 ? 10 - swipeFactor : 10}%`,
  //     };

  const { arScene, menuBar } = open
    ? {
        arScene: "65%",
        menuBar: "35%",
      }
    : {
        arScene: "90%",
        menuBar: "10%",
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
          backgroundColor: "rgb(255, 255, 255)",
        }}
        // onStartShouldSetResponder={(e) => true}
        // onResponderStart={(e) => {
        //   setTouching(true);
        // }}
        // onResponderRelease={(e) => {
        //   setTouching(false);
        // }}
        // onResponderMove={(e) => {
        //   const windowHeight = Dimensions.get("window").height;
        //   if (touching && e.nativeEvent.locationY < 0) {
        //     //setOpen(true);
        //     setTouching(false);
        //   }
        //   setSwipeFactor(windowHeight / e.nativeEvent.locationY);
        // }}
      >
        <Button
          title={"Menu"}
          onPress={() => setOpen(!open)}
          accessibilityLabel="Learn more about this purple button"
        />
        {assets.map((asset) => {
          const { name, source } = asset;
          return (
            <Button
              key={source}
              title={name}
              onPress={() => {
                dispatch(setItem(asset));
              }}
              accessibilityLabel="Learn more about this purple button"
            />
          );
        })}
        {/* <View
          pointerEvents="none"
          style={{ display: "flex", justifyContent: "center", wdith: "100%" }}
        >
          <Text>-----------</Text>
        </View> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
