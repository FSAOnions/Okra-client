import * as React from "react";
import { Text, View, SafeAreaView, Vibration } from "react-native";
import Carousel from "react-native-snap-carousel";
import { connect } from "react-redux";
import getDimensions from "../../util/getDimensions";

const localHost = "http://10.0.0.206:8080";

class SwiperMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      products: [
        {
          name: `034`,
          source: `${localHost}/FoodObjects/034.obj`,
          mtl: `${localHost}/FoodObjects/034.mtl`,
          type: "OBJ",
          scale: 0.008,
        },

        // ...[...Array(8).fill()].map((_, idx) => {
        //   return {
        //     name: `00${idx + 1}`,
        //     source: `${localHost}/FoodObjects/00${idx + 1}.obj`,
        //     mtl: `${localHost}/FoodObjects/00${idx + 1}.mtl`,
        //     type: "OBJ",
        //     scale: 0.008,
        //   };
        // }),
      ],
    };
  }

  _renderItem({ item }) {
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
        <Text style={{ fontSize: 12 }}>{item.name}</Text>
      </View>
    );
  }

  render() {
    const { itemWidth, windowWidth } = getDimensions();
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
            data={this.state.products}
            sliderWidth={windowWidth}
            itemWidth={itemWidth}
            renderItem={this._renderItem}
            onSnapToItem={(index) => this.setState({ activeIndex: index })}
            inactiveSlideScale={0.5}
            inactiveSlideOpacity={0.7}
            activeAnimationType={"decay"}
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
