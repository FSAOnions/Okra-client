import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, View, SafeAreaView, Image } from "react-native";
import getDimensions from "../../../util/getDimensions";
import { setPage } from "../../../redux/reducers/userPage";
import { me } from "../../../redux/reducers/user";
import loadAsset from "../../../util/loadAsset";
import { selectMenu, fetchOrders } from "../../../redux/reducers/menu";
import { createBill } from "../../../redux/reducers/bill";

loadAsset;

const { windowWidth } = getDimensions();
export default function Start() {
  const dispatch = useDispatch();
  const { currentRestaurant } = useSelector(selectMenu);
  useEffect(() => {
    setTimeout(() => {
      attemptLogin();
    }, 2500);
  });

  const attemptLogin = async () => {
    const auth = await dispatch(me());
    if (auth.type === "auth/me/fulfilled") {
      if (currentRestaurant) {dispatch(fetchOrders());}
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
