import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, View, Button } from "react-native";
import { selectUserPage, setPage } from "../../redux/reducers/userPage";

export default function Hamburger() {
  const dispatch = useDispatch();
  return (
    <View
      style={{
        position: "absolute",
        left: 10,
        top: 10,
        zIndex: 500,
        height: 40,
        width: 40,
        backgroundColor: "none",
      }}
    >
      <Button
        title={"<-"}
        onPress={() => dispatch(setPage("home"))}
        accessibilityLabel="Learn more about this purple button"
      />
    </View>
  );
}

const styles = StyleSheet.create({});
