import React from "react";
import { useDispatch } from "react-redux";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { setPage } from "../../redux/reducers/userPage";
import { Image } from "react-native";
import getDimensions from "../../util/getDimensions";
import loadAsset from "../../util/loadAsset";

export default function Trashcan({ canDelete, setDelete }) {
  const { windowWidth } = getDimensions();

  return (
    <View
      style={{
        position: "absolute",
        right: 15,
        top: 75,
        zIndex: 500,
        height: 40,
        width: 40,
        backgroundColor: "none",
      }}
    >
      <TouchableOpacity
        onPress={() => {
          return setDelete(!canDelete);
        }}
      >
        <Image
          source={{
            uri: loadAsset(`${canDelete ? "/red_trash.png" : "/trash.png"}`),
          }}
          style={{ width: windowWidth * 0.08, height: windowWidth * 0.08 }}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
