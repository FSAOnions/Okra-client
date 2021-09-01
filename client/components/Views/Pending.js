import React, { useEffect } from "react";
import { StyleSheet, View, SafeAreaView, Image } from "react-native";
import { useDispatch } from "react-redux";
import getDimensions from "../../util/getDimensions";
import { setPage } from "../../redux/reducers/userPage";
import { me } from "../../redux/reducers/user";
import loadAsset from "../../util/loadAsset";

const { windowWidth } = getDimensions();

export default function Pending() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(me());
    setTimeout(() => {
      dispatch(setPage("settings"));
    }, 2000);
  }, []);
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View>
        <Image
          source={{ uri: loadAsset("/okraAnimated.gif") }}
          style={styles.logo}
        />
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
