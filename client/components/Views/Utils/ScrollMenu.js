import React, { useState, useRef } from "react";
import { StyleSheet, Image, View, Animated } from "react-native";
import { useSelector } from "react-redux";
import { selectMenu } from "../../../redux/reducers/menu";

export default function ScrollMenu() {
  const { menuAssets } = useSelector(selectMenu);
  const scrollX = useRef(new Animated.Value(0)).current;

  const ITEM_SIZE = 70;

  return (
    <View style={styles.container}>
      <Animated.FlatList
        data={menuAssets}
        allowStartFade={true}
        allowEndFade={true}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
        decelerationRate={0}
        bounces={false}
        snapToInterval={ITEM_SIZE}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * ITEM_SIZE,
            index * ITEM_SIZE,
            (index + 1) * ITEM_SIZE,
          ];
          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [0, -10, 0],
          });
          return (
            <View>
              <Animated.View
                key={index}
                style={{ transform: [{ translateY }] }}
              >
                <Image style={styles.tinyImg} source={{ uri: item.source }} />
              </Animated.View>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    overflow: "hidden",
    // marginLeft: "40%",
    width: "100%",
  },
  scrollView: {
    marginHorizontal: 20,
    backgroundColor: "transparent",
  },
  tinyImg: {
    width: 70,
    height: 70,
  },
});
