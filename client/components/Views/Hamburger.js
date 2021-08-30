import React from "react";
import { useDispatch } from "react-redux";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { setPage } from "../../redux/reducers/userPage";
import { Image } from "react-native";
import getDimensions from "../../util/getDimensions";

export default function Hamburger() {
  const dispatch = useDispatch();
  const { windowWidth } = getDimensions();
  return (
    <View
      style={{
        position: "absolute",
        left: 20,
        top: 30,
        zIndex: 500,
        height: 40,
        width: 40,
        backgroundColor: "none",
      }}
    >
     <TouchableOpacity onPress={() => dispatch(setPage("home"))}>
      <Image
        source={require("../../../public/menu-outline.png")}
        style={{width: windowWidth*0.1, height: windowWidth*0.1}}
      /></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
