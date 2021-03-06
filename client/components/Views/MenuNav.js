/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { Text } from "@ui-kitten/components";
import { selectMenu } from "../../redux/reducers/menu";
import SwiperMenu from "./Utils/SwiperMenu";
import getDimensions from "../../util/getDimensions";

import ScrollType from "./Utils/ScrollType";
import loadAsset from "../../util/loadAsset";

export default function MenuNav(props) {
  const [open, setOpen] = useState(false);
  const { singleProduct } = useSelector(selectMenu);

  const { windowHeight } = getDimensions();

  const { arScene, menuBar } = open
    ? {
        arScene: windowHeight * 0.5,
        menuBar: windowHeight * 0.5,
      }
    : {
        arScene: windowHeight * 0.7,
        menuBar: windowHeight * 0.3,
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
            marginBottom: open ? -68 : -85,
            height: 285,
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
            paddingTop: 5,
          }}
        >
          {open ? (
            <>
              {singleProduct && (
                <View style={styles.spaceBetween}>
                  <Text
                    category="h5"
                    style={{
                      color: "rgb(49, 49, 49)",
                      fontFamily: "Marker Felt",
                    }}
                  >
                    {singleProduct.product_name}
                  </Text>
                  <Text
                    category="h6"
                    style={{
                      color: "rgb(49, 49, 49)",
                      fontFamily: "Marker Felt",
                    }}
                  >
                    ${singleProduct.price / 100}
                  </Text>
                </View>
              )}
              <ScrollView
                style={{ height: "100%", overflow: "hidden", paddingTop: 10 }}
              >
                <Text category="p1" style={styles.text}>
                  {singleProduct && singleProduct.description}
                </Text>
              </ScrollView>
            </>
          ) : (
            <>
              {singleProduct ? (
                <View style={styles.title}>
                  <Text
                    category="h5"
                    style={{
                      color: "rgb(49, 49, 49)",
                      fontFamily: "Marker Felt",
                    }}
                  >
                    {singleProduct.product_name}
                  </Text>
                  <Text
                    category="h6"
                    style={{
                      color: "rgb(49, 49, 49)",
                      fontFamily: "Marker Felt",
                    }}
                  >
                    ${singleProduct.price / 100}
                  </Text>
                </View>
              ) : (
                <View style={styles.title}>
                  <Text
                    category="h5"
                    style={{
                      color: "rgb(49, 49, 49)",
                      fontFamily: "Marker Felt",
                    }}
                  >
                    No Product
                  </Text>
                </View>
              )}
            </>
          )}
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
  spaceBetween: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingLeft: 15,
    paddingRight: 15,
  },
  title: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
  },
  text: {
    paddingLeft: 20,
    paddingRight: 20,
    textAlign: "justify",
    color: "rgb(105,105,105)",
    fontFamily: "Marker Felt",
  },
});
