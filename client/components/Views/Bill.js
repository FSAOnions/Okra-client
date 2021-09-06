/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../../redux/reducers/userPage";
import getDimensions from "../../util/getDimensions";
import { selectMenu, fetchOrders } from "../../redux/reducers/menu";
import { Button, Text, ListItem, List } from "@ui-kitten/components";
const { windowHeight, windowWidth } = getDimensions();
import { emptyAll } from "../../redux/reducers/menu";
import { payBill } from "../../redux/reducers/bill";
import { reset } from "../../redux/reducers/user";
import loadAsset from "../../util/loadAsset";
import Hamburger from "./Utils/Hamburger";

export default function Bill() {
  const dispatch = useDispatch();
  const { orders } = useSelector(selectMenu);

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
              Number(item.orderItem.quantity) * Number(item.orderItem.price)
            );
          }, 0)
      )
      .reduce((total, itemTotal) => total + itemTotal, 0);

  const handlePayBill = async () => {
    if (totalPrice) {
      const bill = await dispatch(payBill());
      if (bill.type === "payBill/fulfilled") {
        dispatch(emptyAll());
        dispatch(reset());
        dispatch(setPage("payment"));
      }
    } else {
      Alert.alert("Oh no!", "You have no items in your bill.", [
        { text: "OK", onPress: () => console.log("OK") },
      ]);
    }
  };

  const renderItem = ({ item }) => {
    const qty = item.orderItem.quantity;
    const price = (item.price / 100) * qty;
    return (
      <ListItem
        key={item.id}
        style={styles.item}
        title={`${item.product_name} - (qty: ${qty}) : $${price}`}
      />
    );
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Hamburger uri="home.png" page="home" marg={39} />
      <TouchableOpacity onPress={() => dispatch(setPage("menu"))}>
        <Image
          source={{ uri: loadAsset("/menuicon.png") }}
          style={styles.logo}
        />
      </TouchableOpacity>

      <View style={styles.container}>
        <Text style={styles.title}>Bill Summary:</Text>
        {orders.map((order, index) => {
          return (
            <List key={index} data={order.products} renderItem={renderItem} />
          );
        })}
        <Text style={styles.text}>Total: ${totalPrice / 100}</Text>
      </View>
      <View style={styles.container2}>
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
    fontSize: 30,
    flexDirection: "column",
    justifyContent: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    marginTop: windowHeight * 0.2,
    marginBottom: windowHeight * 0.02,
    textAlign: "center",
    fontFamily: "Marker Felt",
    fontSize: 20,
  },

  image: {
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,
    marginLeft: 5,
    marginTop: 0,
    alignSelf: "flex-end",
    marginTop: 20,
    position: "absolute",
  },
  logo: {
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,
    alignSelf: "flex-end",
    marginTop: -10,
    marginRight: 10,
  },

  title: {
    marginTop: windowHeight * 0.01,
    marginBottom: windowHeight * 0.02,
    textAlign: "center",
    fontFamily: "Marker Felt",
    fontSize: 20,
  },
  container2: {
    fontSize: 30,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  contentContainer2: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  item: {
    marginVertical: 4,
  },
});
