import React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { styles } from "../Home";
import { setPage } from "../../../redux/reducers/userPage";
import { Text } from "@ui-kitten/components";
import { useDispatch } from "react-redux";

export default function HomeSettings() {
  const dispatch = useDispatch();
  return (
    <TouchableOpacity
      onPress={() => {
        dispatch(setPage("settings"));
      }}
    >
      <View
        style={[
          styles.squareR,
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
            source={require("../../../../public/settings.png")}
            style={styles.logo1}
          />
          <Text style={{ fontSize: 20, fontFamily: "Marker Felt" }}>
            Settings
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
