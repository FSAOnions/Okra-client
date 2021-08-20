import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const localHost = "http://10.0.0.206:8080";

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
        source: `${localHost}/CoffeeCup/obj/coffee_cup.obj`,
        mtl: `${localHost}/CoffeeCup/obj/coffee_cup.mtl`,
        type: "OBJ",
        scale: 0.015,
      },
      {
        source: `${localHost}/GunObj/Handgun_obj.obj`,
        mtl: `${localHost}/GunObj/Handgun_obj.mtl`,
        type: "OBJ",
        scale: 0.15,
      },
    ],
  },
  reducers: {
    setProof(state, action) {
      return { ...state, proof: { test: "true", message: "Action" } };
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
export const { setProof } = menuSlice.actions;

//Reducer
/////////////////////////////////////////////////////////////
export default menuSlice.reducer;

//Selectors
/////////////////////////////////////////////////////////////
export const selectMenu = (state) => state.menu;
