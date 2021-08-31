import React, { useEffect, useState } from "react";
import { StyleSheet, View, SafeAreaView, Image } from "react-native";
import { useDispatch } from "react-redux";
import getDimensions from "../../util/getDimensions";
import { setPage } from "../../redux/reducers/userPage";

const serverUrl = "https://okra-onions.herokuapp.com";
const { windowWidth } = getDimensions();
export default function Start() {
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(setPage("login"));
    }, 3000);
  }, []);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View>
        <Image source={{ uri: `${serverUrl}/okra.png` }} style={styles.logo} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
  logo: {
    width: windowWidth * 0.6,
    height: windowWidth * 0.6,
  },
});
