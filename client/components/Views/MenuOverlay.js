import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TouchableOpacity, StyleSheet, View, Alert, Image } from "react-native";
import { Button, Text } from "@ui-kitten/components";
import { setPage } from "../../redux/reducers/userPage";
import getDimensions from "../../util/getDimensions";
import loadAsset from "../../util/loadAsset";
import { addOrderItems, createBill } from "../../redux/reducers/bill";
import { emptySelected, selectMenu } from "../../redux/reducers/menu";

export default function MenuOverlay({ uri = "menu-outline.png" }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { currentRestaurant, selected, orders } = useSelector(selectMenu);
  const { windowWidth } = getDimensions();
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
            await dispatch(setPage("thankyou"));
          }
        },
      },
    ]);
  };
  const totalPrice =
    selected.reduce((total, product) => {
      const cents = product.price * 100;
      return (total += cents);
    }, 0) / 100;
  return (
    <View
      style={{
        position: "absolute",
        right: 20,
        top: 30,
        zIndex: 500,
        height: 40,
        width: 40,
        backgroundColor: "none",
      }}
    >
      <TouchableOpacity onPress={() => setOpen(!open)}>
        <Image
          source={{ uri: loadAsset(`/${uri}`) }}
          style={{ width: windowWidth * 0.1, height: windowWidth * 0.1 }}
        />
        {open && (
          <View
            style={{
              position: "absolute",
              backgroundColor: "rgb(255,255,255)",
              zIndex: 499,
              top: 80,
              right: 20,
              height: 400,
              width: windowWidth - 80,
            }}
          >
            <View style={styles.container}>
              <Text style={styles.text} category="h2">
                Order Summary
              </Text>

              <View style={styles.container}>
                {Object.values(
                  selected.reduce((products, product) => {
                    const { product_name: name, price } = product;
                    if (products[name]) {
                      products[name].quantity++;
                    } else {
                      products[name] = {
                        name,
                        price,
                        quantity: 1,
                      };
                    }
                    return products;
                  }, {})
                ).map((product, idx) => (
                  <View
                    key={`${product.product_name}-${idx}`}
                    style={styles.spaceBetween}
                  >
                    <Text category="label">{product.name}: </Text>
                    <Text category="p1">${product.price / 100}</Text>
                    <Text category="p1">x{product.quantity}</Text>
                  </View>
                ))}
              </View>

              {/* <Text style={styles.none}>Total: ${totalPrice / 100}</Text> */}
            </View>
            <View style={styles.spaceBetween}>
              <Text category="h4">Total: </Text>
              <Text category="h5">${totalPrice / 100}</Text>
            </View>
            <Button style={{ margin: 2 }} onPress={handleOrderClick}>
              Place Order
            </Button>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
    padding: 20,
    textAlign: "center",
  },
  spaceBetween: {
    display: "flex",
    flexDirection: "row",

    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingLeft: 20,
    paddingRight: 20,
  },
});
