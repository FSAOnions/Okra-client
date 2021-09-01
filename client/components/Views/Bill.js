/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../../redux/reducers/userPage";
import getDimensions from "../../util/getDimensions";
import { selectMenu, fetchOrders } from "../../redux/reducers/menu";
import { Button, Text } from "@ui-kitten/components";
import { updateUserRestaurant } from "../../redux/reducers/user";
const { windowHeight, windowWidth } = getDimensions();
import { emptyAll } from "../../redux/reducers/menu";
import { payBill } from "../../redux/reducers/bill";

const serverUrl = "https://okra-onions.herokuapp.com";
const loadAsset = (path) => {
  return `${serverUrl}${path}`;
};

export default function Bill() {
  const dispatch = useDispatch();
  const { orders, restaurants, currentRestaurant } = useSelector(selectMenu);

  useEffect(() => {
    dispatch(fetchOrders());
  }, []);

  const totalPrice =
    orders &&
    orders
      .map((order) =>
        order.products
          .map((product) => product)
          .reduce((total, item) => {
            return (
              total +
              Number(item["order-item"].quantity) *
                Number(item["order-item"].price)
            );
          }, 0)
      )
      .reduce((total, itemTotal) => total + itemTotal, 0);

  const handlePayBill = async () => {
    const bill = await dispatch(payBill());

    if (bill.type === "payBill/fulfilled") {
      // update user rest
      dispatch(emptyAll());
      dispatch(updateUserRestaurant(""));
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <TouchableOpacity onPress={() => dispatch(setPage("home"))}>
        <Image source={loadAsset("/home.png")} style={styles.image} />
      </TouchableOpacity>

      <View style={styles.container}>
        <Text style={styles.text}>Bill Summary:</Text>
        {orders.map((order) => (
          <View>
            {order.products.map((product) => (
              <Text>
                {product.product_name}: ${product.price / 100}
              </Text>
            ))}
          </View>
        ))}
        <Text style={styles.text}>Total: ${totalPrice / 100}</Text>
        <Button onPress={handlePayBill}>Pay Bill</Button>
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
  image: {
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,
    marginLeft: 5,
    marginTop: 0,
  },
});
