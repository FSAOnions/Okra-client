/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Alert
} from "react-native";
import {authenticate, getUser} from "../../redux/reducers/user"
import { setPage } from "../../redux/reducers/userPage";
import { Layout, Input, Button, Text } from "@ui-kitten/components";

export default function LogIn() {
  const dispatch = useDispatch();
  const {user} = useSelector(getUser)
  const [email, onChangeEmail] = useState("")
  const [password, onChangePassword] = useState("");
  useEffect(() => {
    if (user){
      dispatch(setPage("home"))
    }
  }, [user])

  handleSubmit=async()=>{
    // const email =emailLow.toLowerCase() 
    const auth = await dispatch(authenticate({email, password}));
    if (auth.type==="auth/rejected"){
      Alert.alert(
        "Login failed",
        "Your email or password is incorrect. Please try again",
        [
          {
            text: "OK",
            onPress: () => {onChangeEmail("");
            onChangePassword("");},
          },
        ]
      );
      
  }
   
  }

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
            placeholder="Email"
            value={email}
            onChangeText={onChangeEmail}
          />
        </Layout>
        <Layout style={styles.container} level="1">
          <Input
            style={styles.input}
            value={password}
            placeholder="Password"
            onChangeText={onChangePassword}
          />
        </Layout>
        <View style={{ marginTop: 5, alignItems: "center" }}>
          <Button
            style={{ width: "50%", marginTop: 10 }}
            onPress={handleSubmit}
          >
            Login
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
            Don't have an account?{" "}
            <Text onPress={() => dispatch(setPage("signup"))}>Sign Up</Text>
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
