import React, { useEffect } from "react";
import { connect } from "react-redux";
import { StyleSheet, View } from "react-native";
import CartItem from "./CartItem";

import {
  fetchUserCart,
  setToCart,
  removeCartItem,
  editCartItem,
} from "../../redux/reducers/userCart";

export default SingleCart = ({ cartItems }) => {
  useEffect(
    (id) => {
      fetchUserCart(id);
    },
    [cartItems.length]
  );

  console.log("cart", cartItems);
  // const totalprice = cartItems.reduce(
  //   (total, item) => total + item["cartItem"].quantity * item.price,
  //   0
  // );

  // const totalDollar = (totalprice / 100).toFixed(2);

  return (
    <View>
      <header>
        <h2>Cart</h2>
      </header>
      {cartItems.length < 1 ? (
        <h2>
          You have not added any items, order here<Link to="/menu"> Menu </Link>
          !
        </h2>
      ) : (
        cartItems.map((item) => {
          return <CartItem key={item.id} item={item} />;
        })
      )}
      {/* <h2>Total Price: ${totalDollar}</h2> */}
      <Link
        to={{
          pathname: "/order",
          state: { cartItems: cartItems, totalprice: totalprice },
        }}
      >
        Checkout
      </Link>
    </View>
  );
};
