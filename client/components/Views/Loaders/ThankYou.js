import React, { useEffect } from "react";
import { StyleSheet, View, SafeAreaView, Image } from "react-native";
import { useDispatch } from "react-redux";
import getDimensions from "../../../util/getDimensions";
import { setPage } from "../../../redux/reducers/userPage";
import loadAsset from "../../../util/loadAsset";
import { Text } from "@ui-kitten/components";

const { windowWidth, windowHeight } = getDimensions();

export default function ThankYou() {
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(setPage("bill"));
    }, 5000);
  }, []);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View>
        <Text style={styles.text}>Thank You for your Order!</Text>
        <Image
          source={{ uri: loadAsset("/greenloading2.gif") }}
          style={styles.logo}
        />
        <Text style={styles.text}>The Kitchen is on it!</Text>
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
    backgroundColor: "transparent",
  },
  text: {
    textAlign: "center",
    fontFamily: "Marker Felt",
    fontSize: 20,
  },
});
