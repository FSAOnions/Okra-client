import React, { useEffect } from "react";
import { StyleSheet, View, SafeAreaView, Image } from "react-native";
import { useDispatch } from "react-redux";
import getDimensions from "../../../util/getDimensions";
import { setPage } from "../../../redux/reducers/userPage";
import { me } from "../../../redux/reducers/user";
import loadAsset from "../../../util/loadAsset";
loadAsset;

const { windowWidth } = getDimensions();
export default function Start() {
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      attemptLogin();
    }, 2500);
  });

  const attemptLogin = async () => {
    const auth = await dispatch(me());
    if (auth.type === "auth/me/fulfilled") {
      dispatch(setPage("home"));
    } else {
      dispatch(setPage("login"));
    }
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View>
        <Image
          source={{ uri: loadAsset(`/okra.png`) }}
          style={{
            width: windowWidth * 0.6,
            height: windowWidth * 0.6,
          }}
        ></Image>
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
});
