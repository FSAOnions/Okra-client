import React, { useEffect } from "react";
import { StyleSheet, View, SafeAreaView, Image, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import getDimensions from "../../util/getDimensions";
import { setPage } from "../../redux/reducers/userPage";
import { selectMenu } from "../../redux/reducers/menu";
import { Button } from "@ui-kitten/components";
import { fetchOrders } from "../../redux/reducers/menu";

const serverUrl = "https://okra-onions.herokuapp.com";
const loadAsset = (path) => {
  return `${serverUrl}${path}`;
};

const { windowWidth, windowHeight } = getDimensions();

export default function ThankYou() {
  const dispatch = useDispatch();
  const { orders } = useSelector(selectMenu);
  useEffect(() => {
    dispatch(fetchOrders());
    setTimeout(() => {
      dispatch(setPage("bill"));
    }, 5000);
  }, []);

  return (
    <SafeAreaView style={styles.mainContainer}>
      {orders && orders.length ? (
        <View>
          <Text style={styles.text}>Thank You for your Order!</Text>
          <Image source={loadAsset("/greenloading2.gif")} style={styles.logo} />
          <Text style={styles.text}>The Kitchen is on it!</Text>
        </View>
      ) : (
        <View>
          <Text style={styles.text}>
            You have not selected any items yet, please go back to the menu and
            add items:
          </Text>
          <Button onPress={() => dispatch(setPage("menu"))}>Menu</Button>
        </View>
      )}
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
