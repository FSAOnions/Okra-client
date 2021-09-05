import React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { styles } from "../Home";
import { fetchHistory } from "../../../redux/reducers/user";
import { setPage } from "../../../redux/reducers/userPage";
import { Text } from "@ui-kitten/components";
import { useDispatch } from "react-redux";

export default function HomeHistory() {
  const dispatch = useDispatch();
  return (
    <TouchableOpacity
      onPress={() => {
        {
          dispatch(fetchHistory());
          dispatch(setPage("history"));
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
            source={require("../../../../public/history.png")}
            style={styles.logo1}
          />
          <Text style={{ fontSize: 20, fontFamily: "Marker Felt" }}>
            Orders
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
