import React from "react";
import { useDispatch } from "react-redux";
import { TouchableOpacity, View } from "react-native";
import { setPage } from "../../../redux/reducers/userPage";
import { Image } from "react-native";

import { Text } from "@ui-kitten/components";

export default function ScannerSquare({ styles }) {
  const dispatch = useDispatch();
  return (
    <TouchableOpacity
      onPress={() => {
        dispatch(setPage("scanner"));
      }}
      style={{ width: "100%" }}
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
            source={require(`../../../../public/scan.png`)}
            style={styles.logo1}
          />
          <Text style={{ fontSize: 20, fontFamily: "Marker Felt" }}>
            Scan logo
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
