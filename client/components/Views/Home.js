/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { StyleSheet, View, SafeAreaView, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../../redux/reducers/userPage";
import getDimensions from "../../util/getDimensions";
import {
  selectMenu,
  fetchOrders,
  fetchAllRestaurants,
} from "../../redux/reducers/menu";
import { Button, Text } from "@ui-kitten/components";
import { selectUser, me } from "../../redux/reducers/user";
const { windowHeight, windowWidth } = getDimensions();
import { setRestaurant } from "../../redux/reducers/menu";
const serverUrl = "https://okra-onions.herokuapp.com";

export default function Home() {
  const dispatch = useDispatch();
  const { orders, restaurants, currentRestaurant } = useSelector(selectMenu);
  const user = useSelector(selectUser);

  useEffect(() => {
    if (!user) {
      dispatch(me());
    } else {
      if (!restaurants.length) {
        dispatch(fetchAllRestaurants(user.currentRestaurantId));
      } else if (restaurants.length && user.currentRestaurantId) {
        const t = restaurants.find((restaurant) => {
          console.log("r", restaurant, user.currentRestaurantId);
          return restaurant.id == user.currentRestaurantId;
        });
        console.log("hello", t);
        dispatch(setRestaurant(t));
        // dispatch(fetchOrders());
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
        </View>
        {user.currentRestaurantId ? (
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
            {user &&
              `${
                user.firstName.slice(0, 1).toUpperCase() +
                user.firstName.slice(1)
              }'s Profile`}
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
  logo: {
    width: windowWidth * 0.4,
    height: windowWidth * 0.4,
  },
});
