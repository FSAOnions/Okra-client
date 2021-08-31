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
const { windowHeight } = getDimensions();
import { setRestaurant } from "../../redux/reducers/menu";
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
          return restaurant.id == user.currentRestaurantId;
        });
        dispatch(setRestaurant(t));
        // dispatch(fetchOrders());
      }
    }
  }, [user, restaurants]);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View>
        {orders.map((order) => (
          <View>
            <Text>{order.total_price}</Text>
            {order.products.map((product) => (
              <Text>{product.product_name}</Text>
            ))}
          </View>
        ))}
      </View>
      <View style={styles.container}>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text style={styles.text} category="h2">
            {user && `Welcome\n${user.firstName} ${user.lastName}`}
          </Text>
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
