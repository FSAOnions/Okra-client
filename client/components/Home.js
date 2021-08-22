import React from "react";
import { useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { selectUserPage, setPage } from "../redux/reducers/userPage";
import { LogInUser, setUser } from "../redux/reducers/userLog";
import Menu from "./Menu";
import { SafeAreaView, TextInput } from "react-native";

export default function Home() {
  const dispatch = useDispatch();
  const {
    userPage: { onPage },
    userPage,
  } = useSelector(selectUserPage);

  const { userlogIn } = useSelector(LogInUser);


  console.log(userPage);
  console.log(userlogIn.isLoggedIn);
  const [text, onChangeText] = React.useState("Useless Text");


  return (
    <SafeAreaView style={styles.container}>
<View >
      {(userlogIn.isLoggedIn===true) ? 
      (<View><Text>Home</Text>
      <Button
        onPress={() => dispatch(setPage("menu"))}
        title="Open"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      /></View>) : (<View ><Text>Home</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
      />
        <Button
          onPress={()=>dispatch(setUser())}
          title="LogIn"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        /></View>)}
</View>
</SafeAreaView>
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
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
