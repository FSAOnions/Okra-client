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
  const { data } = await axios.get(`${serverUrl}/api/products/${restaurantId}`);
  return data;
  // return data.filter((product) => {
  //   return product.product_type === "Drink";
  // });
});

// export const fetchEntrees = createAsyncThunk("menu/entrees", async () => {
//   const { data } = await axios.get(`${serverUrl}/api/products`);

//   return data.filter((product) => {
//     return product.product_type === "Entree";
//   });
// });

// export const fetchAppetizers = createAsyncThunk("menu/appetizers", async () => {
//   const { data } = await axios.get(`${serverUrl}/api/products`);

//   return data.filter((product) => {
//     return product.product_type === "Appetizer";
//   });
// });

//Slice
/////////////////////////////////////////////////////////////
const menuSlice = createSlice({
  name: "menu",
  initialState: {
    proof: { test: "Bad", message: "" },
    assets: [
      // {
      //   product_name: "Coffee",
      //   product_imgUrl: loadAsset("/CoffeeCup/obj/Red.png"), //img from Sung
      //   threeD_imgUrl: "", //img with mtl and obj
      //   price: 5.99,
      //   description: "Cappuccino",
      //   product_type: "Drink",
      //   assets: {
      //     name: "coffee cup",
      //     source: loadAsset(`/CoffeeCup/obj/coffee_cup.obj`),
      //     mtl: loadAsset(`/CoffeeCup/obj/coffee_cup.mtl`),
      //     type: "OBJ",
      //     scale: 0.015,
      //   },
      //   restaurantId: 1,
      // },
    ],
    menuAssets: [],
    selected: [],
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
