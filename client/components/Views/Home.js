/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../../redux/reducers/userPage";
// import getDimensions from "../../util/getDimensions"
import { selectCart } from "../../redux/reducers/userCart";
import { Button, Text } from "@ui-kitten/components";

export default function Home() {
  const dispatch = useDispatch();
   const cart = useSelector(selectCart);
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Text>
          Welcome!
        </Text>
      </View>
        <View style={{ marginTop: 5, alignItems: "center" }}>
              <Button
                style={{ width:250, marginTop: 10 }}
                onPress={() => dispatch(setPage("menu"))}
              >
                Menu
              </Button>
            </View>
        {cart ? (
          <View>
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
                // onPress={() => dispatch(setPage("cart"))}
              >
                Previous orders
              </Button>
            </View>
          </View>
        ) : (
          <View style={{ marginTop: 5, alignItems: "center" }}>
          <Button
            style={{ width: 250, marginTop: 10 }}
            onPress={() => dispatch(setPage("scanner"))}
          >
            Scan a restaurant logo
          </Button>
        </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "flex-start",
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
    fontSize: 120,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#C2E1C2",
  },
});
