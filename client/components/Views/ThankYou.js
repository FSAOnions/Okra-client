import React, { useEffect } from "react";
import { StyleSheet, View, SafeAreaView, Image, Text } from "react-native";
import { useDispatch } from "react-redux";
import getDimensions from "../../util/getDimensions";
import { setPage } from "../../redux/reducers/userPage";

const serverUrl = "https://okra-onions.herokuapp.com";
const loadAsset = (path) => {
  return `${serverUrl}${path}`;
};

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
    marginTop: windowHeight * 0.2,
    marginBottom: windowHeight * 0.02,
    textAlign: "center",
    fontFamily: "Marker Felt",
  },
});
