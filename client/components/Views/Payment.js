import React, { useEffect } from "react";
import { StyleSheet, View, SafeAreaView, Image, Text } from "react-native";
import { useDispatch } from "react-redux";
import getDimensions from "../../util/getDimensions";
import { setPage } from "../../redux/reducers/userPage";
import loadAsset from "../../util/loadAsset";

const { windowWidth, windowHeight } = getDimensions();

export default function Payment() {
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(setPage("home"));
    }, 4000);
  }, []);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View>
        <Text style={styles.text}>Thank You!</Text>
        <Image
          source={{ uri: loadAsset("/paymentprocessed.gif") }}
          style={styles.logo}
        />
        <Text style={styles.text}>Come Again!</Text>
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
    marginBottom: windowHeight * 0.2,
    textAlign: "center",
    fontFamily: "Marker Felt",
    fontSize: 20,
  },
  logo: {
    width: windowWidth * 0.6,
    height: windowWidth * 0.6,
  },
});
