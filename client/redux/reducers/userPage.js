import { createSlice } from "@reduxjs/toolkit";

//Thunks
////////////////////////////////////////////////////////////
// export const proofOfThunk = createAsyncThunk(
//   "userPage/proofOfThunk",
//   async (message) => {
//     const getFakeData = () =>
//       new Promise((resolve) => {
//         setTimeout(() => {
//           resolve(`GotData: ${message}`);
//         }, 3000);
//       });
//     const data = await getFakeData();
//     return data;
//   }
// );
//Slice
/////////////////////////////////////////////////////////////
const userPageSlice = createSlice({
  name: "page",
  initialState: {
    link: "login",
    scene: () => null,
  },
  reducers: {
    setPage(state, action) {
      console.log("REDUX ACTION: ", action);
      return {
        ...state,
        link: action.payload,
      };
    },
    setScene(state, action) {
      return {
        ...state,
        scene: action.payload,
      };
    },
  },
  //   extraReducers: {
  //     [proofOfThunk.pending]: (state) => {
  //       state.isLoading = true;
  //       state.hasError = false;
  //     },
  //     [proofOfThunk.fulfilled]: (state, action) => {
  //       state.isLoading = false;
  //       state.hasError = false;
  //       //   state.proof = { test: "Good", message: action.payload };
  //     },
  //     [proofOfThunk.rejected]: (state) => {
  //       state.isLoading = false;
  //       state.hasError = true;
  //     },
  //   },
});

//Actions
/////////////////////////////////////////////////////////////
export const { setPage, setScene } = userPageSlice.actions;

//Reducer
/////////////////////////////////////////////////////////////
export default userPageSlice.reducer;

//Selectors
/////////////////////////////////////////////////////////////
export const selectLink = (state) => state.userPage.link;

export const selectScene = (state) => state.userPage.scene;
