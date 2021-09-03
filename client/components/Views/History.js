import React from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  ScrollView,
} from "react-native";
import {  useSelector } from "react-redux";
import getDimensions from "../../util/getDimensions";
import loadAsset from "../../util/loadAsset";
loadAsset;
import { getHistory } from "../../redux/reducers/user";
import Hamburger from "./Hamburger";
const { windowWidth } = getDimensions();
import { Text } from "@ui-kitten/components";

export default function History() {
  const history = useSelector(getHistory);
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 10,
          width: "100%",
        }}
      >
        <Text
          style={{
            fontSize: 30,
            margin: 15,
            marginBottom: 10,
            color: "#212529",
          }}
        >
          Orders
        </Text>
        <Hamburger uri="home.png" page="home" />
      </View>

      <ScrollView>
        {history[0] &&
          history.map((info) => (
            <View
              style={{
                margin: 10,
                marginLeft: windowWidth * 0.05,
                marginRight: 10,
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
                    shadowOpacity: 0.2,
                    shadowRadius: 10,
                  },
                ]}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}
                >
                  <Image
                    source={{ uri: loadAsset(`/${info.restaurant.imgUrl}`) }}
                    style={{
                      width: windowWidth * 0.2,
                      height: windowWidth * 0.2,
                      margin: 10,
                    }}
                  ></Image>
                  <View style={{ width: windowWidth * 0.63 }}>
                    <View
                      style={{
                        flexDirection: "row",
                        marginTop: 3,
                        justifyContent: "space-between",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 15,
                          marginRight: 10,
                          marginTop: 8,
                          marginBottom: 5,
                        }}
                      >
                        {info.restaurant.name}
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          marginRight: 10,
                          marginTop: 8,
                          marginBottom: 5,
                        }}
                      >
                        {info.createdAt.slice(0, 10)}
                      </Text>
                    </View>
                    <View>
                      {info.orders &&
                        info.orders.map((order) => (
                          <View>
                            {order.products.map((product) => (
                              <View
                                style={{
                                  flexDirection: "row",
                                  marginLeft: 13,
                                  marginRight: 10,
                                  justifyContent: "space-between",
                                }}
                              >
                                <Text
                                  style={{
                                    fontSize: 14,
                                  }}
                                >
                                  {product.product_name} x
                                  {product.orderItem.quantity}
                                </Text>
                                <Text
                                  style={{
                                    fontSize: 14,
                                  }}
                                >
                                  {Number(product.price) / 100}
                                </Text>
                              </View>
                            ))}
                          </View>
                        ))}
                    </View>
                    <View
                                style={{
                                  flexDirection: "row",
                                  marginLeft: 13,
                                  marginRight: 10,
                                  marginBottom: 10,
                                  justifyContent: "space-between",
                                }}
                              >
                                <Text
                                  style={{
                                    fontSize: 14,
                                  }}
                                >
                                  Total: 
                                </Text>
                                <Text
                                  style={{
                                    fontSize: 14,
                                  }}
                                >
                                  {info.dollars}
                                </Text>
                              </View>
                  </View>
                </View>
              </View>
            </View>
          ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  square: {
    alignSelf: "center",
    backgroundColor: "white",
    borderRadius: 7,
    shadowColor: "black",
    width: windowWidth * 0.9,
  },
});
