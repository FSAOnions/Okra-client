import React from "react";
import { useDispatch } from "react-redux";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { setPage } from "../../../redux/reducers/userPage";
import { Image, Alert } from "react-native";
import getDimensions from "../../../util/getDimensions";
import { Text } from "@ui-kitten/components";
import { emptyAll } from "../../../redux/reducers/menu";
import { leaveRestaurant, reset } from "../../../redux/reducers/user";

const { windowHeight, windowWidth } = getDimensions();

export default function LeaveSquare({ styles, hasRestaurant }) {
  const dispatch = useDispatch();
  const { windowWidth } = getDimensions();
  const handleLeave = () => {
    dispatch(emptyAll());
    dispatch(reset());
    dispatch(leaveRestaurant());
    dispatch(setPage("home"));
  };
  return (
    <TouchableOpacity
      onPress={handleLeave}
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
            source={require(`../../../../public/leave.png`)}
            style={styles.logo1}
          />
          <Text style={{ fontSize: 20, fontFamily: "Marker Felt" }}>Leave</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
