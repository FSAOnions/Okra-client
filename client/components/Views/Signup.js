import React, { useState } from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import { Layout, Input, Button, Text } from "@ui-kitten/components";
import { setPage } from "../../redux/reducers/userPage";
import { useDispatch } from "react-redux";

export default function Signup() {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    let user = { firstName, lastName, email, password };
    console.log(user);
    return user;
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
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
            onChangeText={(nextValue) => setFirstName(nextValue)}
          />
        </Layout>
        <Layout style={styles.container} level="1">
          <Input
            style={styles.input}
            value={lastName}
            placeholder="Last Name"
            autoCapitalize="none"
            onChangeText={(nextValue) => setLastName(nextValue)}
          />
        </Layout>
        <Layout style={styles.container} level="1">
          <Input
            style={styles.input}
            value={email}
            placeholder="Email"
            autoCapitalize="none"
            onChangeText={(nextValue) => setEmail(nextValue)}
          />
        </Layout>
        <Layout style={styles.container} level="1">
          <Input
            style={styles.input}
            value={password}
            placeholder="Password"
            secureTextEntry={true}
            autoCapitalize="none"
            onChangeText={(nextValue) => setPassword(nextValue)}
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
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginTop: 15,
          }}
        >
          <Text style={{ color: "lightgrey" }}>
            Have an account?{" "}
            <Text onPress={() => dispatch(setPage("login"))}>Login</Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "space-evenly",
    width: "100%",
    height: "100%",
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
