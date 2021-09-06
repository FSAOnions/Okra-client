import React from "react";
import { StyleSheet, View, Button } from "react-native";

export default function FourOhFour() {
  return (
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <Button
        title={"You seem lost"}
        onPress={() => console.log("i am 404")}
        accessibilityLabel="Learn more about this purple button"
      />
    </View>
  );
}

const styles = StyleSheet.create({});
