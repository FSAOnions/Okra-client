import React, { useState } from "react";
import { connect } from "react-redux";
import { StyleSheet, View, YellowBox } from "react-native";
import { removeCartItem, editCartItem } from "../../redux/reducers/userCart";

const CartItem = ({ item, deleteCartItem, updateCart }) => {
  const [quantity, setQuantity] = useState(item["cartItem"].quantity);
  const handleClick = () => {
    deleteCartItem(item);
  };
  const handleUpdate = () => {
    updateCart(item.id, quantity);
  };
  return (
    <View>
      <h3>{item.name}</h3>

      <p>Price: {item.dollars}</p>
      <input
        type="number"
        min="1"
        value={quantity}
        onChange={({ target }) => {
          console.log(target.value);
          setQuantity(target.value);
        }}
      />
      {/* <button onClick={handleUpdate}>Update Cart</button>
      <button onClick={handleClick}>Remove From Cart</button> */}
    </View>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    deleteCartItem: (cartItem) => {
      dispatch(removeCartItem(cartItem));
    },
    updateCart: (itemId, quantity) => {
      dispatch(editCartItem(itemId, quantity));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
