import React from "react";
import { useDispatch } from "react-redux";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { setPage } from "../../redux/reducers/userPage";
import { Image } from "react-native";
import getDimensions from "../../util/getDimensions";
const { windowHeight, windowWidth } = getDimensions();
import { Text } from "@ui-kitten/components";

export default function NameCard({ user }) {
  const dispatch = useDispatch();
  return (
    <View
      style={[
        styles.squareM,
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
        <Text style={{ fontSize: 30, fontFamily: "Marker Felt" }}>
          {user &&
            `Hello, ${
              user.firstName.slice(0, 1).toUpperCase() + user.firstName.slice(1)
            }`}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  squareM: {
    alignSelf: "center",
    backgroundColor: "white",
    borderRadius: 7,
    shadowColor: "black",
    width: "100%",
    marginLeft: 20,
    marginRight: 20,
    marginBottom: windowWidth * 0.1,
  },
});
