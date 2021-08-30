import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const serverUrl = "https://okra-onions.herokuapp.com";

//Thunks
export const fetchUserCart = createAsyncThunk("userCart", async (id) => {
  const { data } = await axios.get(`${serverUrl}/api/userCart/${id}`);

  console.log({ data });

  return data;
});

export const setToCart = createAsyncThunk(
  "setToCart",
  async (itemId, quantity) => {
    const { data } = await axios.post(
      `${serverUrl}/api/userCart/${itemId}?quantity=${quantity}`
    );

    return data;
  }
);

export const removeCartItem = createAsyncThunk(
  "userCart/removeItem",
  async (cartItem) => {
    await axios.delete(`${serverUrl}/api/userCart/${cartItem.id}`);
  }
);

export const editCartItem = createAsyncThunk(
  "userCart/editItem",
  async (cartItem, history) => {
    await axios.put(`${serverUrl}/api/userCart/${cartItem.id}`);
    history.push("/");
  }
);

//Slice
/////////////////////////////////////////////////////////////
const userCartSlice = createSlice({
  name: "userCart",
  initialState: {
    cartItems: [],

    item: { position: [0, -0.5, -0.5] },
  },
  reducers: {
    setCartItems(state, action) {
      return { ...state, cartItems: [...state.cartItems, action.payload] };
    },
    setItem(state, action) {
      return { ...state, item: action.payload };
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchUserCart.fulfilled, (state, action) => {
        state.cartItems = action.payload;
      })
      .addCase(fetchUserCart.rejected, (state, action) => {
        console.log(action.payload);
      })
      .addCase(setToCart.fulfilled, (state, action) => {
        state.cartItems = action.payload;
        // return { cartItems: [...state.cartItems, action.payload] };
      })
      .addCase(setToCart.rejected, (state, action) => {
        console.log(action.payload);
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        // state.cartItems = action.payload;
      })
      .addCase(removeCartItem.rejected, (state, action) => {
        console.log(action.payload);
      });
  },
});

//Actions
/////////////////////////////////////////////////////////////
export const { setCartItems, setItem } = userCartSlice.actions;

//Reducer
/////////////////////////////////////////////////////////////
export default userCartSlice.reducer;

//Selectors
/////////////////////////////////////////////////////////////
export const selectCart = (state) => state.userCart;
