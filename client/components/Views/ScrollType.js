import React, { useState, useRef, useEffect } from "react";
import {
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Vibration,
  ImageBackground,
  FlatList,
  StyleSheet,
} from "react-native";
import Carousel from "react-native-snap-carousel";

import getDimensions from "../../util/getDimensions";
import {
  selectMenu,
  setFilter,
  setSelected,
  setSingleProduct,
} from "../../redux/reducers/menu";
import { Button, Text } from "@ui-kitten/components";

import { useSelector, useDispatch } from "react-redux";

const DURATION = 1000;
// const PATTERN = [1000, 2000, 3000];
const types = ["All", "Appetizer", "Drink", "Entree", "Dessert"];
const ScrollType = ({ pFU }) => {
  //const [activeIndex, setActiveIndex] = useState(0);
  const { currentRestaurant, filteredAssets } = useSelector(selectMenu);
  const dispatch = useDispatch();

  // eslint-disable-next-line no-unused-vars
  let carousel = useRef();
  const filter = (type = null) => {
    dispatch(setFilter(type));
  };
  const handleSnap = (index) => {
    dispatch(setFilter(types[index] === "All" ? null : types[index]));
  };

  const _renderItem = ({ item }) => {
    const { itemPadding, windowWidth, itemWidth } = getDimensions(
      types.length,
      110
    );

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
          // layout={"default"}
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
  // const { windowWidth } = getDimensions();
  // return (
  //   <FlatList
  //     data={["Appetizer", "Drink", "Entree", "Dessert"]}
  //     horizontal={true}
  //     style={{
  //       overflow: "hidden",
  //       width: windowWidth,
  //     }}
  //     renderItem={_renderItem}
  //   />
  // );
};
export default ScrollType;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    overflow: "hidden",
    width: "100%",
  },
  bold: {
    fontWeight: "bold",
  },
  normal: {
    fontWeight: "normal",
  },
});
