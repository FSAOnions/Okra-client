import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import data from "../../util/data";
const serverUrl = "https://okra-onions.herokuapp.com";
const local = "http://10.0.0.206:8080";
const loadAsset = (path) => {
  return `${local}${path}`;
};

// export const fetchProducts = createAsyncThunk(
//   "menu/fetchProducts",
//   async (menuOption) => {
//     const { data } = await axios.get(`${serverUrl}/api/products`);
//     return data;
//   }
// );

export const fetchSingleItem = createAsyncThunk(
  "menu/fetchSingleItem",
  async (id) => {
    const { data } = await axios.get(`${serverUrl}/api/products/${id}`);

    return data;
  }
);

export const deleteItemThunk = createAsyncThunk(
  "menu/deleteItem",
  async (id) => {
    await axios.delete(`${serverUrl}/api/products/${id}`);
  }
);

export const editItemThunk = createAsyncThunk("menu/editItem", async (id) => {
  await axios.put(`${serverUrl}/api/products/${id}`);
  history.push("/");
});

//Category Thunks
/////////////////////////////////////////////////////////////
export const fetchMenu = createAsyncThunk("menu", async (restaurantId) => {
  const { data } = await axios.get(
    `${serverUrl}/api/products/restaurants/${restaurantId}`
  );

  return data;
  // return data.filter((product) => {
  //   return product.product_type === "Drink";
  // });
});

export const fetchAllRestaurants = createAsyncThunk("restaurants", async () => {
  const { data } = await axios.get(`${serverUrl}/api/products/restaurants`);

  return data;
});

export const fetchOrders = createAsyncThunk("fetchOrders", async () => {
  const { data } = await axios.get(`${serverUrl}/api/order`);

  return data;
});
const types = ["Appetizer", "Drink", "Entree", "Dessert"];
const INIT_STATE = {
  selected: [],
  currentRestaurant: {
    products: [
      ...data.filter((product) => product.product_type === types[0]),
      ...data.filter((product) => product.product_type === types[1]),
      ...data.filter((product) => product.product_type === types[2]),
      ...data.filter((product) => product.product_type === types[3]),
    ],
  },
  restaurants: [],
  orders: [],
  singleProduct: {},
  filteredProducts: [],
  filteredAssets: [
    ...data.filter((product) => product.product_type === types[0]),
    ...data.filter((product) => product.product_type === types[1]),
    ...data.filter((product) => product.product_type === types[2]),
    ...data.filter((product) => product.product_type === types[3]),
  ],
};
//Slice
/////////////////////////////////////////////////////////////
const menuSlice = createSlice({
  name: "menu",
  initialState: INIT_STATE,
  reducers: {
    setSelected(state, action) {
      return { ...state, selected: [...state.selected, action.payload] };
    },
    setFilter(state, action) {
      const type = action.payload;
      const products = state.currentRestaurant.products;
      const filtered = !type
        ? products
        : products.filter((product) => product.product_type === type);
      return { ...state, filteredAssets: filtered };
    },
    setRestaurant(state, action) {
      const assets = action.payload.products;
      return {
        ...state,
        currentRestaurant: action.payload,
        filteredAssets: assets,
      };
    },
    setSingleProduct(state, action) {
      return { ...state, singleProduct: action.payload };
    },
    setFilteredProducts(state, action) {
      return { ...state, filteredProducts: action.payload };
    },
    emptySelected(state, action) {
      return { ...state, selected: [] };
    },
    emptyAll(state, action) {
      return INIT_STATE;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenu.fulfilled, (state, action) => {
        state.assets = action.payload;
      })
      .addCase(fetchAllRestaurants.fulfilled, (state, action) => {
        state.restaurants = action.payload;
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
export const {
  setProof,
  setSelected,
  setItem,
  setProducts,
  setSingleProduct,
  setFilteredProducts,
  setFilter,
  emptySelected,
  setRestaurant,
  emptyAll,
} = menuSlice.actions;

//Reducer
/////////////////////////////////////////////////////////////
export default menuSlice.reducer;

//Selectors
/////////////////////////////////////////////////////////////
export const selectMenu = (state) => state.menu;
