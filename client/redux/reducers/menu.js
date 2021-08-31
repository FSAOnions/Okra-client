import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const serverUrl = "https://okra-onions.herokuapp.com";
const local = "http://10.0.0.206:8080";
const loadAsset = (path) => {
  return `${local}${path}`;
};
//Thunks
/////////////////////////////////////////////////////////////
export const proofOfThunk = createAsyncThunk(
  "menu/proofOfThunk",
  async (message) => {
    const getFakeData = () =>
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(`GotData: ${message}`);
        }, 3000);
      });
    const data = await getFakeData();
    return data;
  }
);

export const fetchProducts = createAsyncThunk(
  "menu/fetchProducts",
  async () => {
    const { data } = await axios.get(`${serverUrl}/api/products`);

    console.log({ data });

    return data;
  }
);

export const fetchSingleItem = createAsyncThunk(
  "menu/fetchSingleItem",
  async (id) => {
    const { data } = await axios.get(`${serverUrl}/api/products/${id}`);

    // console.log({ data });

    return data;
  }
);

export const deleteItemThunk = createAsyncThunk(
  "menu/deleteItem",
  async (id) => {
    await axios.delete(`${serverUrl}/api/products/${id}`);
  }
);

export const editItemThunk = createAsyncThunk(
  "menu/editItem",
  async (id, history) => {
    await axios.put(`${serverUrl}/api/products/${id}`);
    history.push("/");
  }
);

export const fetchOrders = createAsyncThunk("fetchOrders", async () => {
  const { data } = await axios.get(`${serverUrl}/api/order`);

  return data;
});

//Slice
/////////////////////////////////////////////////////////////
const menuSlice = createSlice({
  name: "menu",
  initialState: {
    proof: { test: "Bad", message: "" },
    assets: [
      {
        product_name: "Coffee",
        product_imgUrl: loadAsset("/CoffeeCup/obj/Red.png"), //img from Sung
        threeD_imgUrl: "", //img with mtl and obj
        price: 5.99,
        description: "Cappuccino",
        product_type: "Drink",
        assets: {
          name: "coffee cup",
          source: loadAsset(`/CoffeeCup/obj/coffee_cup.obj`),
          mtl: loadAsset(`/CoffeeCup/obj/coffee_cup.mtl`),
          type: "OBJ",
          scale: 0.015,
        },
        restaurantId: 1,
      },
      {
        product_name: "Coffee",
        product_imgUrl: loadAsset("/CoffeeCup/obj/Green.png"), //img from Sung
        threeD_imgUrl: "", //img with mtl and obj
        price: 5.99,
        description: "Cappuccino",
        product_type: "Drink",
        assets: {
          name: "coffee cup",
          source: loadAsset(`/CoffeeCup/obj/coffee_cup.obj`),
          mtl: loadAsset(`/CoffeeCup/obj/coffee_cup.mtl`),
          type: "OBJ",
          scale: 0.015,
        },
        restaurantId: 1,
      },
      {
        product_name: "Coffee",
        product_imgUrl: loadAsset("/CoffeeCup/obj/Blue.png"), //img from Sung
        threeD_imgUrl: "", //img with mtl and obj
        price: 5.99,
        description: "Cappuccino",
        product_type: "Drink",
        assets: {
          name: "coffee cup",
          source: loadAsset(`/CoffeeCup/obj/coffee_cup.obj`),
          mtl: loadAsset(`/CoffeeCup/obj/coffee_cup.mtl`),
          type: "OBJ",
          scale: 0.015,
        },
        restaurantId: 1,
      },
    ],
    menuAssets: [],
    selected: [],
    orders: [],
    item: { position: [0, -0.5, -0.5] },
  },
  reducers: {
    setProof(state, action) {
      return { ...state, proof: { test: "true", message: "Action" } };
    },
    setSelected(state, action) {
      return { ...state, selected: [...state.selected, action.payload] };
    },
    setItem(state, action) {
      return { ...state, item: action.payload };
    },
    emptySelected(state, action) {
      return { ...state, selected: [] };
    },
  },

  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.assets = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        console.log(action.payload);
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        console.log(action.payload);
      });
  },
});

//Actions
/////////////////////////////////////////////////////////////
export const { setProof, setSelected, setItem, setProducts, emptySelected } =
  menuSlice.actions;

//Reducer
/////////////////////////////////////////////////////////////
export default menuSlice.reducer;

//Selectors
/////////////////////////////////////////////////////////////
export const selectMenu = (state) => state.menu;
