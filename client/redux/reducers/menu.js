import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import data from "../../util/data";
import path from "../../util/loadAsset";

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
    const { data } = await axios.get(path(`/api/products/${id}`));

    return data;
  }
);

export const deleteItemThunk = createAsyncThunk(
  "menu/deleteItem",
  async (id) => {
    await axios.delete(path(`/api/products/${id}`));
  }
);

export const editItemThunk = createAsyncThunk("menu/editItem", async (id) => {
  await axios.put(path(`/api/products/${id}`));
});

//Category Thunks
/////////////////////////////////////////////////////////////
export const fetchMenu = createAsyncThunk("menu", async (restaurantId) => {
  const { data } = await axios.get(
    path(`/api/products/restaurants/${restaurantId}`)
  );
  return data;
});

export const fetchAllRestaurants = createAsyncThunk("restaurants", async () => {
  const { data } = await axios.get(path(`/api/products/restaurants`));

  return data;
});

export const fetchOrders = createAsyncThunk("fetchOrders", async () => {
  const { data } = await axios.get(path(`/api/order`));
  return data;
});

const INIT_STATE = {
  selected: [],
  currentRestaurant: {},
  restaurants: [],
  orders: [],
  singleProduct: {},
  filteredProducts: [],
  filteredAssets: [],
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
      let filtered = !type
        ? products
        : products.filter((product) => product.product_type === type);
      if (!filtered) {
        filtered = [{}];
      }
      return {
        ...state,
        filteredAssets: filtered,
        singleProduct: filtered[0],
      };
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
    deleteSingleProduct(state, action) {
      return {
        ...state,
        selected: state.selected.filter(
          (product) => product.key != action.payload
        ),
      };
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
  deleteSingleProduct,
} = menuSlice.actions;

//Reducer
/////////////////////////////////////////////////////////////
export default menuSlice.reducer;

//Selectors
/////////////////////////////////////////////////////////////
export const selectMenu = (state) => state.menu;
