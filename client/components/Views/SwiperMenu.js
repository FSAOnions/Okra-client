import * as React from "react";
import {
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Vibration,
} from "react-native";
import Carousel from "react-native-snap-carousel";
import { connect } from "react-redux";
import getDimensions from "../../util/getDimensions";
import { setSelected } from "../../redux/reducers/menu";
import store from "../../redux/store";

const serverUrl = "https://okra-onions.herokuapp.com";
const DURATION = 1000;
// const PATTERN = [1000, 2000, 3000];

class SwiperMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      products: [],
    };
  }

  componentDidMount() {
    this.setState({
      products: this.props.menu.assets,
    });
  }

  componentDidUpdate() {
    if (this.props.menu.assets !== this.state.products) {
      this.setState({
        products: this.props.menu.assets,
      });
    }
  }

  // _handleTouch(product) {
  //   const dispatch = store.dispatch;
  //   Vibration.vibrate(100, DURATION);
  //   dispatch(setSelected(product));
  // }
  _renderItem({ item }) {
    const { itemPadding, windowWidth, windowHeight} = getDimensions();

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
            const dispatch = store.dispatch;
            Vibration.vibrate(100, DURATION);
            dispatch(setSelected(item));
          }}
        >
          <Image
            style={{ width: windowWidth * 0.25, height: windowWidth * 0.25 }}
            source={{ uri: item.product_imgUrl }}
          />
        </TouchableOpacity>
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
