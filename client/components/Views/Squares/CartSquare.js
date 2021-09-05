import React from "react";
import { useDispatch } from "react-redux";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { setPage } from "../../../redux/reducers/userPage";
import { Image, Alert } from "react-native";
import getDimensions from "../../../util/getDimensions";
import loadAsset from "../../../util/loadAsset";
import { Text } from "@ui-kitten/components";

const { windowHeight, windowWidth } = getDimensions();

export default function CartSquare({ styles, hasRestaurant }) {
  const dispatch = useDispatch();
  const { windowWidth } = getDimensions();
  return (
    <TouchableOpacity
      onPress={() => {
        if (hasRestaurant) {
          dispatch(setPage("bill"));
        } else {
          Alert.alert("No Restaurant Found", "Please scan a restaurant logo", [
            {
              text: "Ok",
              onPress: () => {},
            },
          ]);
        }
      }}
    >
      <View
        style={[
          styles.square,
          {
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowOpacity: 0.3,
            shadowRadius: 7,
          },
        ]}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            margin: 10,
          }}
        >
          <Image
            source={require(`../../../../public/cart.png`)}
            style={styles.logo1}
          />
          <Text style={{ fontSize: 20, fontFamily: "Marker Felt" }}>Cart</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
