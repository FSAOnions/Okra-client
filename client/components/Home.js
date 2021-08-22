import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { useDispatch } from "react-redux";
import { setPage } from "../redux/reducers/userPage";

export default function Home() {
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Button
        onPress={() => dispatch(setPage("menu"))}
        title="Open"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
    fontSize: 80,
    alignItems: "center",
    justifyContent: "center",
  },
});
