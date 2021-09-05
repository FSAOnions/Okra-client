import React, { useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  Animated,
  Easing,
} from "react-native";
import { useDispatch } from "react-redux";
import getDimensions from "../../util/getDimensions";
import { setPage } from "../../redux/reducers/userPage";
import { me } from "../../redux/reducers/user";
import loadAsset from "../../util/loadAsset";
loadAsset;

const { windowWidth } = getDimensions();
export default function Start() {
  // const animatedValue = useRef(new Animated.Value(0)).current;
  const dispatch = useDispatch();

  // const handleAnimation = () => {
    // Animated.timing(animatedValue, {
    //   toValue: 1,
    //   duration: 2000,
    //   easing: Easing.ease,
    // }).start();
    useEffect(()=>{
      setTimeout(() => {
      attemptLogin();
    }, 2500);
  })
    
  
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
        {/* <Animated.Image
          source={{ uri: loadAsset("/okra.png") }}
          onLoad={handleAnimation}
          style={{
            width: windowWidth * 0.5,
            height: windowWidth * 0.5,
            transform: [
              {
                scale: animatedValue.interpolate({
                  inputRange: [0, 0.3],
                  outputRange: [0.8, 1],
                }),
              },
            ],
          }}
        /> */}
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
