import React, { useRef } from "react";
import { View, SafeAreaView, StyleSheet } from "react-native";
import Carousel from "react-native-snap-carousel";
import getDimensions from "../../../util/getDimensions";
import { setFilter } from "../../../redux/reducers/menu";
import { Button } from "@ui-kitten/components";

import { useDispatch } from "react-redux";

const types = ["All", "Appetizer", "Drink", "Entree", "Dessert"];

const ScrollType = ({ pFU }) => {
  const dispatch = useDispatch();

  const filter = (type = null) => {
    dispatch(setFilter(type));
  };
  const handleSnap = (index) => {
    dispatch(setFilter(types[index] === "All" ? null : types[index]));
  };

  const _renderItem = ({ item }) => {
    const { itemPadding, itemWidth } = getDimensions(types.length, 110);

    return (
      <View
        style={{
          height: 40,
          marginTop: 5,
          marginBottom: 5,
          marginLeft: itemPadding,
          marginRight: itemPadding,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View>
          <Button
            style={{
              width: itemWidth * 1.5,
              borderColor: "rgb(105,105,105)",
            }}
            onPress={() => {
              filter(item);
            }}
          >
            {item}
          </Button>
        </View>
      </View>
    );
  };
  const { windowWidth, itemWidth } = getDimensions(types.length, 110);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.3)",
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Carousel
          ref={(ref) => (carousel = ref)}
          data={types}
          sliderWidth={windowWidth}
          itemWidth={itemWidth * 1.5}
          renderItem={_renderItem}
          enableSnap={true}
          onSnapToItem={handleSnap}
          enableMomentum={true}
          inactiveSlideScale={0.8}
          inactiveSlideOpacity={0.7}
          activeAnimationType={"decay"}
        />
      </View>
    </SafeAreaView>
  );
};
export default ScrollType;
