/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import {authenticate} from "../../redux/reducers/user"
// import { values } from "sequelize/types/lib/operators";
export default function LogIn() {
  const dispatch = useDispatch();
  const [email, onChangeEmail]=useState("")
  const [password, onChangePassword]=useState("")
  handleSubmit=()=>{
    console.log("HandleSubmit",email, password)
    dispatch(authenticate({email, password}))
  }
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../../public/logo.jpeg")}
      />
      <View style={styles.inputView}>
  <TextInput
    style={styles.TextInput}
    placeholder="Email"
    value={email}
    onChangeText={onChangeEmail}
    placeholderTextColor="#003f5c"
  />
</View>
 
<View style={styles.inputView}>
  <TextInput
    style={styles.TextInput}
    placeholder="Password"
    placeholderTextColor="#003f5c"
    onChangeText={onChangePassword}
    value={password}
    secureTextEntry={true}
  />
</View>
      <TouchableOpacity style={styles.loginBtn}>
        <Button
          title="LOGIN"
          onPress={handleSubmit}
          style={styles.loginText}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    marginBottom: 40,
    width: "40%",
    height: "20%",
  },

  inputView: {
    backgroundColor: "#38b000",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,

    alignItems: "center",
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },

  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
  inputView: {
    backgroundColor: "#FFC0CB",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
 
    alignItems: "center",
  },
 
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },

  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#38b000",
  },
});
