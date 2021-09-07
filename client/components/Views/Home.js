/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { StyleSheet, View, SafeAreaView, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import getDimensions from "../../util/getDimensions";
import { selectMenu, fetchAllRestaurants } from "../../redux/reducers/menu";
import { Text } from "@ui-kitten/components";
import { selectUser, me } from "../../redux/reducers/user";
import { setRestaurant } from "../../redux/reducers/menu";
import NameCard from "./Utils/NameCard";
import MenuSquare from "./Squares/MenuSquare";
import CartSquare from "./Squares/CartSquare";
import ScannerSquare from "./Squares/ScannerSquare";
import HistorySquare from "./Squares/HistorySquare";
import SettingsSquare from "./Squares/SettingsSquare";
import LeaveSquare from "./Squares/LeaveSquare";

const { windowWidth } = getDimensions();
const serverUrl = "https://okra-onions.herokuapp.com";

export default function Home() {
  const dispatch = useDispatch();
  const { restaurants, selected, orders } = useSelector(selectMenu);
  const user = useSelector(selectUser);

  useEffect(() => {
    if (!user) {
      dispatch(me());
    } else {
      if (!restaurants.length) {
        // Near by
        dispatch(fetchAllRestaurants(user.currentRestaurantId));
      } else if (restaurants.length && user.currentRestaurantId) {
        dispatch(
          setRestaurant(
            restaurants.find((restaurant) => {
              return restaurant.id == user.currentRestaurantId;
            })
          )
        );
      }
    }
  }, [user, restaurants]);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Image
            source={{ uri: `${serverUrl}/logo.png` }}
            style={styles.logo}
          />
          <NameCard user={user} />
        </View>
        <View style={styles.squareContainer}>
          {user.currentRestaurantId ? (
            <View
              style={{
                flexDirection: "row",
                width: windowWidth,
                justifyContent: "space-evenly",
              }}
            >
              <MenuSquare styles={squareStyles} />
              {orders && orders.length > 0 ? (
                <CartSquare
                  styles={squareStyles}
                  hasRestaurant={user.currentRestaurantId}
                />
              ) : (
                <LeaveSquare styles={squareStyles} />
              )}
            </View>
          ) : (
            <ScannerSquare styles={squareStyles} />
          )}
        </View>
        <View style={styles.squareContainer}>
          <HistorySquare styles={squareStyles} />
          <SettingsSquare styles={squareStyles} />
        </View>
      </View>
      <View style={{ width: "100%", alignItems: "center" }}>
        <Text>Copyright © Okra 2021.</Text>
      </View>
    </SafeAreaView>
  );
}
const squareStyles = StyleSheet.create({
  square: {
    alignSelf: "center",
    backgroundColor: "white",
    borderRadius: 7,
    shadowColor: "black",
    width: windowWidth * 0.35,
  },
  logo1: {
    width: windowWidth * 0.25,
    height: windowWidth * 0.25,
  },
});
export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
    fontSize: 120,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  squareContainer: {
    display: "flex",
    justifyContent: "space-evenly",
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    marginLeft: 40,
    marginRight: 40,
    marginTop: 40,
  },
  logo: {
    width: windowWidth * 0.4,
    height: windowWidth * 0.4,
  },
});
