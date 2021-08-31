import React, { useState, useEffect } from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import { Layout, Input, Button, Text } from "@ui-kitten/components";
import { setPage } from "../../redux/reducers/userPage";
import { useDispatch, useSelector } from "react-redux";
import { update, selectUser } from "../../redux/reducers/user";
import getDimensions from "../../util/getDimensions";

const { windowWidth, windowHeight } = getDimensions();

export default function Settings() {
  const dispatch = useDispatch();
  const { id, firstName, lastName, email, password } = useSelector(selectUser);
  const [firstNameS, setFirstName] = useState(firstName);
  const [lastNameS, setLastName] = useState(lastName);
  const [emailLow, setEmail] = useState(email);
  const [passwordS, setPassword] = useState("");

  const handleSubmit = () => {
    const email = emailLow.toLowerCase();
    const userUpdated = dispatch(
      update({ id, firstName, lastName, email, password })
    );
    if (userUpdated) {
      dispatch(setPage("home"));
    }
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
          <Text>Email</Text>
          <Input
            style={styles.input}
            value={emailLow}
            placeholder={email}
            autoCapitalize="none"
            onChangeText={setEmail}
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