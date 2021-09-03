import React from "react";
import { useDispatch } from "react-redux";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { setPage } from "../../redux/reducers/userPage";
import { Image } from "react-native";
import getDimensions from "../../util/getDimensions";
import loadAsset from "../../util/loadAsset";

export default function Hamburger({ uri, page }) {
  const dispatch = useDispatch();
  const { windowWidth } = getDimensions();
  return (
    <View
      style={{
        position: "absolute",
        left: 20,
        top: 15,
        zIndex: 500,
        height: 40,
        width: 40,
        backgroundColor: "none",
      }}
    >
      <TouchableOpacity onPress={() => dispatch(setPage(page))}>
        <Image
          source={{ uri: loadAsset(`/${uri}`) }}
          style={{ width: windowWidth * 0.08, height: windowWidth * 0.08 }}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
