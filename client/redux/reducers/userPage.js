import { createSlice } from "@reduxjs/toolkit";

//Thunks
////////////////////////////////////////////////////////////

//Slice
/////////////////////////////////////////////////////////////
const userPageSlice = createSlice({
  name: "page",
  initialState: {
    link: "start",
  },
  reducers: {
    setPage(state, action) {
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
