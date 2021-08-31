/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Button, Vibration, Text } from "react-native";
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

export default function MenuNav(props) {
  const [open, setOpen] = useState(false);
  const { currentRestaurant, selected, singleProduct, filteredProducts } =
    useSelector(selectMenu);
  const { loading } = useSelector(selectBill);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    Filtering();
  }, []);

  const handleOrderClick = async () => {
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
  };

  const { windowHeight } = getDimensions();

  const { arScene, menuBar } = open
    ? {
        arScene: windowHeight * 0.6,
        menuBar: windowHeight * 0.4,
      }
    : {
        arScene: windowHeight * 0.82,
        menuBar: windowHeight * 0.18,
      };

  const Filtering = (type = null) => {
    type
      ? dispatch(
          setFilteredProducts(
            currentRestaurant.products.filter(
              (product) => product.product_type === type
            )
          )
        )
      : dispatch(setFilteredProducts(currentRestaurant.products));
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
            marginBottom: 0,
            height: 100,

            width: "100%",
            backgroundColor: "none",
          }}
        >
          <SwiperMenu {...props} />
        </View>
        <View style={{ height: "100%", backgroundColor: "rgb(255, 255, 255)" }}>
          <Button
            title={"Menu"}
            onPress={() => {
              // ReactNativeHapticFeedback.trigger("impactLight", options);
              Vibration.vibrate(10, true);
              setOpen(!open);
            }}
            accessibilityLabel="Learn more about this purple button"
          />
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Button
              title={"Appetizers"}
              onPress={() => {
                Filtering("Appetizer");
                Vibration.vibrate(10, true);
              }}
            />
            <Button
              title={"Entrees"}
              onPress={() => {
                Filtering("Entree");
                Vibration.vibrate(10, true);
              }}
            />
            <Button
              title={"Drinks"}
              onPress={() => {
                Filtering("Drink");
                Vibration.vibrate(10, true);
              }}
            />
          </View>

          {/* <ScrollView style={{ height: "100%", overflow: "hidden" }}>
            {assets.map((product, index) => {
              console.log("assets from scrollview", assets);
              const { id, description } = product; */}
          <Button
            title={"Order"}
            onPress={handleOrderClick}
            accessibilityLabel="Learn more about this purple button"
          />
          {singleProduct && singleProduct.id ? (
            <Text
              style={{
                margin: 10,
                fontSize: 25,
                color: "green",
                textAlign: "center",
              }}
            >
              {singleProduct.description}
            </Text>
          ) : (
            <></>
          )}
          {/* <ScrollView style={{ height: "100%", overflow: "hidden" }}>
            {assets.map((product) => {
              const { product_name, id } = product;
              return (
                <View>
                  <Button
                    key={id}
                    title={""}
                    onPress={() => {
                      dispatch(setItem(product));
                    }}
                    accessibilityLabel="Learn more about this purple button"
                  />
                </View>
              );
            })}
          </ScrollView> */}
        </View>
      </View>
    </View>
  );
}
