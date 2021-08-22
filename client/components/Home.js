import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { selectUserPage, setPage } from "../redux/reducers/userPage";
import FourOhFour from "./FourOhFour";
import Menu from "./Menu";
import MenuNav from "./MenuNav";

const getPage = (link) => {
  switch (link) {
    case "home":
      return <Home />;
    case "menu":
      return <Menu />;
    default:
      return <FourOhFour />;
  }
};

export default function Home() {
  const dispatch = useDispatch();
  const { onPage, link } = useSelector(selectUserPage);
  return (
    <View style={styles.container}>
      <Text>Home</Text>

      <Button
        onPress={() => dispatch(setPage("menu"))}
        title="Open"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
      {onPage && getPage(link)}
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
