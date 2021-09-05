/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../../redux/reducers/userPage";
import getDimensions from "../../util/getDimensions";
import { selectMenu, fetchAllRestaurants } from "../../redux/reducers/menu";
import { Text } from "@ui-kitten/components";
import { selectUser, me } from "../../redux/reducers/user";
import { setRestaurant } from "../../redux/reducers/menu";
import HomeHistory from "./HomeComponents/History";
import HomeSettings from "./HomeComponents/Settings";

const { windowHeight, windowWidth } = getDimensions();
const serverUrl = "https://okra-onions.herokuapp.com";

export default function Home() {
  const dispatch = useDispatch();
  const { orders, restaurants, currentRestaurant } = useSelector(selectMenu);
  const user = useSelector(selectUser);

  useEffect(() => {
    if (!user) {
      dispatch(me());
    } else {
      if (!restaurants.length) {
        dispatch(fetchAllRestaurants(user.currentRestaurantId));
      } else if (restaurants.length && user.currentRestaurantId) {
        const t = restaurants.find((restaurant) => {
          console.log("r", restaurant, user.currentRestaurantId);
          return restaurant.id == user.currentRestaurantId;
        });
        console.log("hello", t);
        dispatch(setRestaurant(t));
      }
    }
  }, [user, restaurants]);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Image
            source={{ uri: `${serverUrl}/logo.png` }}
            style={styles.logo}
          />
            <View
              style={[
                styles.squareM,
                {
                  shadowOffset: {
                    width: 0,
                    height: 0,
                  },
                  shadowOpacity: 0.3,
                  shadowRadius: 7,
                },
              ]}
            >
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  margin: 10,
                }}
              >
                <Text style={{ fontSize: 30, fontFamily: "Marker Felt" }}>
                  {user &&
                    `Hello, ${
                      user.firstName.slice(0, 1).toUpperCase() +
                      user.firstName.slice(1)
                    }`}
                </Text>
              </View>
            </View>
        </View>
        <View style={{ marginTop: 5 }}>
          {user.currentRestaurantId ? (
            <View style={{ justifyContent: "center", flexDirection: "column" }}>
              <View
                style={{
                  marginLeft: windowWidth * 0.1,
                  flexDirection: "row",
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    dispatch(setPage("menu"));
                  }}
                >
                  <View
                    style={[
                      styles.square,
                      {
                        shadowOffset: {
                          width: 0,
                          height: 0,
                        },
                        shadowOpacity: 0.3,
                        shadowRadius: 7,
                      },
                    ]}
                  >
                    <View
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                        margin: 10,
                      }}
                    >
                      <Image
                        source={require("../../../public/menu.png")}
                        style={styles.logo1}
                      />
                      <Text style={{ fontSize: 20, fontFamily: "Marker Felt" }}>
                        Menu
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    dispatch(setPage("bill"));
                  }}
                >
                  <View
                    style={[
                      styles.squareR,
                      {
                        shadowOffset: {
                          width: 0,
                          height: 0,
                        },
                        shadowOpacity: 0.3,
                        shadowRadius: 7,
                      },
                    ]}
                  >
                    <View
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                        margin: 10,
                      }}
                    >
                      <Image
                        source={require("../../../public/cart.png")}
                        style={styles.logo1}
                      />
                      <Text style={{ fontSize: 20, fontFamily: "Marker Felt" }}>
                        Cart
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  margin: windowWidth * 0.1,
                }}
              >
                <HomeHistory />
                <HomeSettings />
              </View>
            </View>
          ) : (
            <View>
              <View
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row",
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    dispatch(setPage("scanner"));
                  }}
                >
                  <View
                    style={[
                      styles.square,
                      {
                        shadowOffset: {
                          width: 0,
                          height: 0,
                        },
                        shadowOpacity: 0.3,
                        shadowRadius: 7,
                      },
                    ]}
                  >
                    <View
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                        margin: 10,
                      }}
                    >
                      <Image
                        source={require("../../../public/scan.png")}
                        style={styles.logo1}
                      />
                      <Text style={{ fontSize: 20, fontFamily: "Marker Felt" }}>
                        Scan logo
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
                <HomeHistory />
              </View>

              <HomeSettings />
            </View>
          )}
        </View>
      </View>
      <View style={{ width: "100%", alignItems: "center" }}>
        <Text>Copyright © Okra 2021.</Text>
      </View>
    </SafeAreaView>
  );
}

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
    fontSize: 120,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    marginTop: windowHeight * 0.2,
    marginBottom: windowHeight * 0.02,
    textAlign: "center",
    fontFamily: "Marker Felt",
  },
  pics: {
    width: 30,
    height: 30,
    backgroundColor: "transparent",
  },
  logo: {
    width: windowWidth * 0.4,
    height: windowWidth * 0.4,
  },
  logo1: {
    width: windowWidth * 0.25,
    height: windowWidth * 0.25,
  },
  square: {
    alignSelf: "center",
    backgroundColor: "white",
    borderRadius: 7,
    shadowColor: "black",
    width: windowWidth * 0.35,
    marginLeft: windowWidth * 0.1,
    marginRight: windowWidth * 0.05,
  },

  squareR: {
    alignSelf: "center",
    backgroundColor: "white",
    borderRadius: 7,
    shadowColor: "black",
    width: windowWidth * 0.35,
    marginRight: windowWidth * 0.1,
    marginLeft: windowWidth * 0.05,
  },
  squareM: {
    alignSelf: "center",
    backgroundColor: "white",
    borderRadius: 7,
    shadowColor: "black",
    width: windowWidth * 0.8,
    margin: windowWidth * 0.15,
    marginBottom: windowWidth * 0.1,
  },

  squareOne: {
    alignSelf: "center",
    backgroundColor: "white",
    borderRadius: 7,
    shadowColor: "black",
    width: windowWidth * 0.35,
    marginLeft: windowWidth * 0.1,
    marginTop: windowWidth * 0.1,
    marginRight: windowWidth * 0.55,
  },
});
