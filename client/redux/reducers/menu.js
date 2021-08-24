import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const serverUrl = "https://okra-onions.herokuapp.com";

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

    return data;
  }
);

//Slice
/////////////////////////////////////////////////////////////
const menuSlice = createSlice({
  name: "menu",
  initialState: {
    proof: { test: "Bad", message: "" },
    assets: [
      {
        name: "coffee cup",
        source: `${serverUrl}/CoffeeCup/obj/coffee_cup.obj`,
        mtl: `${serverUrl}/CoffeeCup/obj/coffee_cup.mtl`,
        type: "OBJ",
        scale: 0.015,
      },
    ],
    menuAssets: [
      { name: "burger", source: `${serverUrl}/burger.png` },
      { name: "fries", source: `${serverUrl}/fries.png` },
      { name: "burger", source: `${serverUrl}/burger.png` },
      { name: "fries", source: `${serverUrl}/fries.png` },
      { name: "burger", source: `${serverUrl}/burger.png` },
      { name: "fries", source: `${serverUrl}/fries.png` },
      { name: "burger", source: `${serverUrl}/burger.png` },
      { name: "fries", source: `${serverUrl}/fries.png` },
      { name: "burger", source: `${serverUrl}/burger.png` },
      { name: "fries", source: `${serverUrl}/fries.png` },
      { name: "burger", source: `${serverUrl}/burger.png` },
      { name: "fries", source: `${serverUrl}/fries.png` },
      { name: "burger", source: `${serverUrl}/burger.png` },
      { name: "fries", source: `${serverUrl}/fries.png` },
    ],
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
      });
  },
});

//Actions
/////////////////////////////////////////////////////////////
export const { setProof, setSelected, setItem } = menuSlice.actions;

//Reducer
/////////////////////////////////////////////////////////////
export default menuSlice.reducer;

//Selectors
/////////////////////////////////////////////////////////////
export const selectMenu = (state) => state.menu;
