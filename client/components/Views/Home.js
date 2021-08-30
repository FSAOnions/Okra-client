/* eslint-disable no-unused-vars */
import React from "react";
import { StyleSheet, View, SafeAreaView, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../../redux/reducers/userPage";
import getDimensions from "../../util/getDimensions";
import { selectCart } from "../../redux/reducers/userCart";
import { Button, Text } from "@ui-kitten/components";
import { getUser } from "../../redux/reducers/user";
const { windowHeight } = getDimensions();
import { fetchAllRestaurants } from "../../redux/reducers/menu";

export default function Home() {
  const dispatch = useDispatch();
  const { cartItems } = useSelector(selectCart);
  const user = useSelector(getUser);
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text style={styles.text} category="h2">
            {`Welcome\n${user.firstName} ${user.lastName}`}
          </Text>
        </View>

        {cartItems.length !== 0 ? (
          <View>
            <View style={{ marginTop: 5, alignItems: "center" }}>
              <Button
                style={{ width: 250, marginTop: 10 }}
                onPress={() => dispatch(setPage("menu"))}
              >
                Menu
              </Button>
            </View>
            <View style={{ marginTop: 5, alignItems: "center" }}>
              <Button
                style={{ width: 250, marginTop: 10 }}
                // onPress={() => dispatch(setPage("cart"))}
              >
                My cart
              </Button>
            </View>
            <View style={{ marginTop: 5, alignItems: "center" }}>
              <Button
                style={{ width: 250, marginTop: 10 }}
                //onPress={() => dispatch(setPage("cart"))}
              >
                Previous orders
              </Button>
            </View>
          </View>
        ) : (
          <View
            style={{ marginTop: windowHeight * 0.07, alignItems: "center" }}
          >
            <Button
              style={{ width: 250, marginTop: 10 }}
              onPress={() => {
                dispatch(fetchAllRestaurants());
                dispatch(setPage("scanner"));
              }}
            >
              Scan a restaurant logo
            </Button>
          </View>
        )}
        <View style={{ marginTop: 5, alignItems: "center" }}>
          <Button
            style={{ width: 250, marginTop: 10 }}
            onPress={() => dispatch(setPage("pending"))}
          >
            Settings
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#C2E1C2",
  },
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
    fontSize: 120,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  text: {
    marginTop: windowHeight * 0.2,
    marginBottom: windowHeight * 0.02,
    textAlign: "center",
    fontFamily: "Marker Felt",
  },
  pics: {
    width: 30,
    height: 30,
    backgroundColor: "transparent",
  },
});
