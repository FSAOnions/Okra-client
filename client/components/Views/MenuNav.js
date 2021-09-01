/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Alert,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import {
  selectMenu,
  emptySelected,
  setFilteredProducts,
} from "../../redux/reducers/menu";
import SwiperMenu from "./SwiperMenu";
import getDimensions from "../../util/getDimensions";
import {
  addOrderItems,
  selectBill,
  createBill,
} from "../../redux/reducers/bill";
import { setPage } from "../../redux/reducers/userPage";
import { selectUser } from "../../redux/reducers/user";
import { setFilter } from "../../redux/reducers/menu";
import ScrollType from "./ScrollType";
import { Button } from "@ui-kitten/components";

export default function MenuNav(props) {
  const [open, setOpen] = useState(false);
  const { currentRestaurant, selected, singleProduct, filteredAssets } =
    useSelector(selectMenu);
  const { loading } = useSelector(selectBill);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const handleOrderClick = () => {
    Alert.alert("Confirm Order", "Are you sure?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "Order",
        onPress: async () => {
          await dispatch(createBill(currentRestaurant.id));
          const cleanedUpArr = selected.map(({ price, id }) => ({ price, id }));
          const payload = {};

          cleanedUpArr.forEach(({ id, price }) => {
            if (id in payload) {
              payload[id].quantity++;
            } else {
              payload[id] = { quantity: 1, price };
            }
          });
          const order = await dispatch(addOrderItems(payload));

          if (order.type === "addOrderItems/fulfilled") {
            await dispatch(emptySelected());
            await dispatch(setPage("home"));
          }
        },
      },
    ]);
  };

  const { windowHeight } = getDimensions();

  const { arScene, menuBar } = open
    ? {
        arScene: windowHeight * 0.5,
        menuBar: windowHeight * 0.5,
      }
    : {
        arScene: windowHeight * 0.75,
        menuBar: windowHeight * 0.25,
      };

  const serverUrl = "https://okra-onions.herokuapp.com";
  const loadAsset = (path) => {
    return `${serverUrl}${path}`;
  };

  return (
    <View
      pointerEvents="box-none"
      style={{
        position: "absolute",
        top: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        height: "100%",
        width: "100%",
      }}
    >
      <View pointerEvents="none">
        <View
          pointerEvents="auto"
          style={{
            top: 0,
            width: "100%",
            height: arScene,
          }}
        />
      </View>
      <View
        pointerEvents="auto"
        style={{
          width: "100%",
          height: menuBar,
          backgroundColor: "none",
        }}
      >
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: -75,
            height: 275,
            width: "100%",
            backgroundColor: "none",
          }}
        >
          <SwiperMenu {...props} />
          <TouchableOpacity
            onPress={() => setOpen(!open)}
            style={styles.toggle}
          >
            <Image
              source={{
                uri: loadAsset("/uparrow.png"),
              }}
              style={open ? styles.flip : styles.image}
            />
          </TouchableOpacity>
          <ScrollType />
        </View>
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgb(255, 255, 255)",
          }}
        >
          <Button style={{ margin: 2 }} onPress={handleOrderClick}>
            Order
          </Button>
          <ScrollView style={{ height: "100%", overflow: "hidden" }}>
            <Text
              style={{
                margin: 10,
                fontSize: 25,
                color: "green",
                textAlign: "center",
              }}
            >
              {singleProduct && singleProduct.description}
            </Text>
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    height: 30,
    width: 60,
  },
  flip: {
    height: 30,
    width: 60,
    transform: [{ rotate: "180deg" }],
  },
  toggle: {
    display: "flex",
    justifyContent: "center",
    height: 30,
    width: 60,
    marginBottom: 15,
    borderRadius: 15,
  },
});
