import React, { useState, useRef } from "react";
import {
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Vibration,
} from "react-native";
import Carousel from "react-native-snap-carousel";

import getDimensions from "../../util/getDimensions";
import { selectMenu, setSelected } from "../../redux/reducers/menu";

import { useSelector, useDispatch } from "react-redux";

const DURATION = 1000;
// const PATTERN = [1000, 2000, 3000];

const SwiperMenu = ({ pFU }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { assets } = useSelector(selectMenu);
  const dispatch = useDispatch();
  let carousel = useRef();
  console.log(pFU);
  const _renderItem = ({ item }) => {
    const { itemPadding, windowWidth } = getDimensions();
    return (
      <View
        style={{
          backgroundColor: "transparent",
          borderRadius: 5,
          height: 75,
          marginLeft: itemPadding,
          marginRight: itemPadding,
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            Vibration.vibrate(100, DURATION);
            dispatch(setSelected({ ...item, pFU }));
          }}
        >
          <Image
            style={{ width: windowWidth * 0.25, height: windowWidth * 0.25 }}
            source={{ uri: item.product_imgUrl }}
          />
        </TouchableOpacity>
      </View>
    );
  };
  const { windowWidth, itemWidth } = getDimensions();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "transparent",
        paddingTop: 50,
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
          data={assets}
          sliderWidth={windowWidth}
          itemWidth={itemWidth}
          renderItem={_renderItem}
          onSnapToItem={(index) => setActiveIndex(index)}
          inactiveSlideScale={0.5}
          inactiveSlideOpacity={0.7}
          activeAnimationType={"decay"}
        />
      </View>
    </SafeAreaView>
  );
};
export default SwiperMenu;
