import { Dimensions } from "react-native";

export default function getDimensions(totalItems = 10) {
  const itemWidth = 75;
  const padding = 40;
  const itemPadding = padding / 2;
  let initTotal = totalItems * itemWidth + totalItems * padding;
  const itemOffset = itemWidth / 2 + itemPadding;
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const paddingOffset = windowWidth / 2 - itemOffset;
  const firstLastPadding = itemOffset;
  const sliderWidth = initTotal + paddingOffset * 2;

  return { firstLastPadding, itemPadding, sliderWidth, itemWidth, windowWidth, windowHeight };
}
