import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const localHost = "http://192.168.1.153:8080";

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

//Slice
/////////////////////////////////////////////////////////////
const menuSlice = createSlice({
  name: "menu",
  initialState: {
    proof: { test: "Bad", message: "" },
    assets: [
      {
        name: "coffee cup",
        source: `${localHost}/CoffeeCup/obj/coffee_cup.obj`,
        mtl: `${localHost}/CoffeeCup/obj/coffee_cup.mtl`,
        type: "OBJ",
        scale: 0.015,
      },
      // {
      //   name: "hand gun",
      //   source: `${localHost}/GunObj/Handgun_obj.obj`,
      //   mtl: `${localHost}/GunObj/Handgun_obj.mtl`,
      //   type: "OBJ",
      //   scale: 0.15,
      // },
      {
        name: "Pizza Baby",
        source: `${localHost}/FoodObjects/040.obj`,
        resources: [
          { uri: `${localHost}/FoodObjects/AM150_040_specular.jpg` },
          { uri: `${localHost}/FoodObjects/AM150_040_bump.jpg` },
        ],
        mtl: `${localHost}/FoodObjects/040.mtl`,
        type: "OBJ",
        scale: 0.008,
      },
      // ...[...Array(8).fill()].map((_, idx) => {
      //   return {
      //     name: `00${idx + 1}`,
      //     source: `${localHost}/FoodObjects/00${idx + 1}.obj`,
      //     mtl: `${localHost}/FoodObjects/00${idx + 1}.mtl`,
      //     type: "OBJ",
      //     scale: 0.008,
      //   };
      // }),
    ],
    menuAssets: [
      { name: "burger", source: `${localHost}/burger.png` },
      { name: "fries", source: `${localHost}/fries.png` },
      { name: "burger", source: `${localHost}/burger.png` },
      { name: "fries", source: `${localHost}/fries.png` },
      { name: "burger", source: `${localHost}/burger.png` },
      { name: "fries", source: `${localHost}/fries.png` },
      { name: "burger", source: `${localHost}/burger.png` },
      { name: "fries", source: `${localHost}/fries.png` },
      { name: "burger", source: `${localHost}/burger.png` },
      { name: "fries", source: `${localHost}/fries.png` },
      { name: "burger", source: `${localHost}/burger.png` },
      { name: "fries", source: `${localHost}/fries.png` },
      { name: "burger", source: `${localHost}/burger.png` },
      { name: "fries", source: `${localHost}/fries.png` },
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
  extraReducers: {
    [proofOfThunk.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [proofOfThunk.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.hasError = false;
      state.proof = { test: "Good", message: action.payload };
    },
    [proofOfThunk.rejected]: (state) => {
      state.isLoading = false;
      state.hasError = true;
    },
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
