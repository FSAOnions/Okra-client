import * as React from "react";
import { Text, View, SafeAreaView } from "react-native";
import Carousel from "react-native-snap-carousel";
import { connect } from "react-redux";
import getDimensions from "../util/getDimensions";

class SwiperMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeIndex: 0,
      carouselItems: [
        {
          title: "Item 1",
          text: "Text 1",
        },
        {
          title: "Item 2",
          text: "Text 2",
        },
        {
          title: "Item 3",
          text: "Text 3",
        },
        {
          title: "Item 4",
          text: "Text 4",
        },
        {
          title: "Item 5",
          text: "Text 5",
        },
        {
          title: "Item 6",
          text: "Text 6",
        },
        {
          title: "Item 7",
          text: "Text 7",
        },
        {
          title: "Item 8",
          text: "Text 8",
        },
        {
          title: "Item 9",
          text: "Text 9",
        },
        {
          title: "Item 10",
          text: "Text 10",
        },
      ],
    };
  }

  _renderItem({ item, index }) {
    const { itemPadding } = getDimensions();

    return (
      <View
        style={{
          backgroundColor: "floralwhite",
          borderRadius: 5,
          height: 75,
          marginLeft: itemPadding,
          marginRight: itemPadding,
        }}
      >
        <Text style={{ fontSize: 30 }}>{item.title}</Text>
        <Text>{item.text}</Text>
      </View>
    );
  }

  render() {
    const { itemWidth, windowWidth } = getDimensions();
    console.log(this.props);

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
            ref={(ref) => (this.carousel = ref)}
            data={this.state.carouselItems}
            sliderWidth={windowWidth}
            itemWidth={itemWidth}
            renderItem={this._renderItem}
            onSnapToItem={(index) => this.setState({ activeIndex: index })}
            inactiveSlideScale={0.5}
            inactiveSlideOpacity={0.7}
            activeAnimationType={"spring"}
          />
        </View>
      </SafeAreaView>
    );
  }
}

export default connect(
  (state) => ({
    menu: state.menu,
  }),
  null
)(SwiperMenu);
