import React, { useState } from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import { Layout, Input, Button, Text } from "@ui-kitten/components";
import { setPage } from "../../redux/reducers/userPage";
import { useDispatch, useSelector } from "react-redux";
import { update, selectUser, logout } from "../../redux/reducers/user";
import getDimensions from "../../util/getDimensions";
import Hamburger from "./Utils/Hamburger";

const { windowWidth, windowHeight } = getDimensions();

export default function Settings() {
  const dispatch = useDispatch();
  const { firstName, lastName, email } = useSelector(selectUser);
  const [firstNameS, setFirstName] = useState(firstName);
  const [lastNameS, setLastName] = useState(lastName);
  const [passwordS, setPassword] = useState("");

  const handleSubmit = () => {
    const userUpdated = dispatch(
      update({
        firstName: firstNameS,
        lastName: lastNameS,
        email,
        password: passwordS,
      })
    );
    if (userUpdated) {
      dispatch(setPage("home"));
    }
  };
  const handleLogout = async () => {
    const loggedOut = await dispatch(logout());
    if (loggedOut.type === "user/logout/fulfilled") {
      dispatch(setPage("login"));
    }
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
      <Hamburger uri="home.png" page="home" />
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
          <Text>First name</Text>
          <Input
            style={styles.input}
            value={firstNameS}
            placeholder={firstName}
            autoCapitalize="none"
            onChangeText={setFirstName}
          />
        </Layout>
        <Layout style={styles.container} level="1">
          <Text>Last name</Text>
          <Input
            style={styles.input}
            value={lastNameS}
            placeholder={lastName}
            autoCapitalize="none"
            onChangeText={setLastName}
          />
        </Layout>
        <Layout style={styles.container} level="1">
          <Text>Password</Text>
          <Input
            style={styles.input}
            value={passwordS}
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
            Apply changes
          </Button>
        </View>
        <View style={{ marginTop: 5, alignItems: "center" }}>
          <Button
            style={{ width: "50%", marginTop: 10 }}
            onPress={handleLogout}
          >
            Logout
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-start",
    width: windowWidth,
    height: windowHeight,
    backgroundColor: "#FFFFFF",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    margin: 5,
  },
  bottom: {
    flex: 0.5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginLeft: 30,
    marginRight: 30,
  },
});
