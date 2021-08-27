import React, { useState, useEffect } from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import { Layout, Input, Button, Text } from "@ui-kitten/components";
import { setPage } from "../../redux/reducers/userPage";
import { useDispatch, useSelector } from "react-redux";
import { windowHeight } from "../../util/getDimensions";
import {signup, getUser} from "../../redux/reducers/user"

export default function Signup() {
  const dispatch = useDispatch();
  const {user} = useSelector(getUser)
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user){
      dispatch(setPage("home"))
    }
  }, [user])

  const handleSubmit = () => {
    let createUser = { firstName, lastName, email, password };
    console.log(createUser);
    dispatch(signup(createUser))
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View
        style={{
          marginTop: 100,
          marginBottom: 80,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={styles.text} category="h1">
          OKRA
        </Text>
      </View>
      <View style={styles.bottom}>
        <Layout style={styles.container} level="1">
          <Input
            style={styles.input}
            value={firstName}
            placeholder="First Name"
            autoCapitalize="none"
            onChangeText={setFirstName}
          />
        </Layout>
        <Layout style={styles.container} level="1">
          <Input
            style={styles.input}
            value={lastName}
            placeholder="Last Name"
            autoCapitalize="none"
            onChangeText={setLastName}
          />
        </Layout>
        <Layout style={styles.container} level="1">
          <Input
            style={styles.input}
            value={email}
            placeholder="Email"
            autoCapitalize="none"
            onChangeText={setEmail}
          />
        </Layout>
        <Layout style={styles.container} level="1">
          <Input
            style={styles.input}
            value={password}
            placeholder="Password"
            secureTextEntry={true}
            autoCapitalize="none"
            onChangeText={setPassword}
          />
        </Layout>
        <View style={{ marginTop: 5, alignItems: "center" }}>
          <Button
            style={{ width: "50%", marginTop: 10 }}
            onPress={handleSubmit}
          >
            Sign Up
          </Button>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginTop: 15,
          }}
        >
          <Text style={{ color: "lightgrey" }}>
            Have an account?
            <Text onPress={handleSubmit}>Login</Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "flex-start",
    width: "100%",
    height: windowHeight,
  },
  container: {
    flexDirection: "row",
    margin: 10,
  },
  input: {
    flex: 1,
    margin: 2,
  },
  bottom: {
    flex: 0.5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginLeft: 30,
    marginRight: 30,
  },
});
