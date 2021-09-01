import React, { useState, useRef, useEffect } from "react";
import {
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Vibration,
  ImageBackground,
  Text,
  Button,
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
    const { itemPadding, windowWidth } = getDimensions();

    return (
      <View
        style={{
          width: "100%",
          marginLeft: itemPadding,
          marginRight: itemPadding,
          alignItems: "center",
        }}
      >
        <View style={{ width: "100%" }}>
          <Button
            title={`${item}`}
            style={{ width: "100%" }}
            onPress={() => {
              filter(item);
            }}
          />
        </View>
      </View>
    );
  };
  const { windowWidth, itemWidth } = getDimensions();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "rgb(255,255,255)",
        height: 30,
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
          layout={"default"}
          ref={(ref) => (carousel = ref)}
          data={types}
          sliderWidth={windowWidth}
          itemWidth={110}
          renderItem={_renderItem}
          enableSnap={true}
          onSnapToItem={handleSnap}
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
    // marginLeft: "40%",
    width: "100%",
  },
  bold: {
    fontWeight: "bold",
  },
  normal: {
    fontWeight: "normal",
  },
});
