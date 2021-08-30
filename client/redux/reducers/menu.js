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
  async (menuOption) => {
    const { data } = await axios.get(`${serverUrl}/api/products`);
    return data;
  }
);

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

//Slice
/////////////////////////////////////////////////////////////
const menuSlice = createSlice({
  name: "menu",
  initialState: {
    proof: { test: "Bad", message: "" },
    assets: [],
    menuAssets: [],
    selected: [],
    restaurants: [],
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
      .addCase(fetchMenu.fulfilled, (state, action) => {
        state.assets = action.payload;
      })
      .addCase(fetchAllRestaurants.fulfilled, (state, action) => {
        state.restaurants = action.payload;
      });
  },
});

//Actions
/////////////////////////////////////////////////////////////
export const { setProof, setSelected, setItem, setProducts } =
  menuSlice.actions;

//Reducer
/////////////////////////////////////////////////////////////
export default menuSlice.reducer;

//Selectors
/////////////////////////////////////////////////////////////
export const selectMenu = (state) => state.menu;
