import React, { useState, useRef, useEffect } from "react";
import {
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Vibration,
  ImageBackground,
  Text,
} from "react-native";
import Carousel from "react-native-snap-carousel";

import getDimensions from "../../util/getDimensions";
import {
  selectMenu,
  setSelected,
  setSingleProduct,
} from "../../redux/reducers/menu";
import guid from "../../util/guid";

import { useSelector, useDispatch } from "react-redux";

const DURATION = 1000;
// const PATTERN = [1000, 2000, 3000];

const SwiperMenu = ({ pFU }) => {
  //const [activeIndex, setActiveIndex] = useState(0);
  const { filteredAssets } = useSelector(selectMenu);
  const dispatch = useDispatch();
  const handleSnap = (index) => {
    dispatch(setSingleProduct(filteredAssets[index]));
  };
  useEffect(() => {
    handleSnap(0);
  }, []);
  // eslint-disable-next-line no-unused-vars
  let carousel = useRef();

  const _renderItem = ({ item }) => {
    const { itemPadding, windowWidth } = getDimensions();

    return (
      <View
        style={{
          backgroundColor: "transparent",
          borderRadius: 5,
          height: 200,
          marginBottom: 100,
          marginLeft: itemPadding,
          marginRight: itemPadding,
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            Vibration.vibrate(100, DURATION);
            dispatch(setSelected({ ...item, pFU, key: guid() }));
          }}
        >
          {/* <ImageBackground
            source={{ uri: item.product_imgUrl }}
            resizeMode="cover"
            style={{ width: windowWidth * 0.25, height: windowWidth * 0.25 }}
          /> */}
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
          data={filteredAssets}
          sliderWidth={windowWidth}
          itemWidth={itemWidth}
          renderItem={_renderItem}
          // enableSnap={true}
          onSnapToItem={handleSnap}
          inactiveSlideScale={0.5}
          inactiveSlideOpacity={0.7}
          activeAnimationType={"decay"}
        />
      </View>
    </SafeAreaView>
  );
};
export default SwiperMenu;
