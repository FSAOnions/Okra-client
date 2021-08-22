import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, View, Button } from "react-native";

export default function MenuNav() {
  const [open, setOpen] = useState(false);
  const { arScene, menuBar } = open
    ? { arScene: "80%", menuBar: "20%" }
    : { arScene: "90%", menuBar: "10%" };
  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <View
        pointerEvents="none"
        style={{
          top: 0,
          width: "100%",
          height: arScene,
        }}
      />
      <View
        style={{
          width: "100%",
          height: menuBar,
          backgroundColor: "rgb(255, 255, 255)",
        }}
      >
        <Button
          title={"Menu Navigator"}
          onPress={() => setOpen(!open)}
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
