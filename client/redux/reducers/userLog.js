import { createSlice } from "@reduxjs/toolkit";
const userLoggedInSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false
  },
  reducer: {
    setUser(state, action){
      console.log("State")
      return {
       isLoggedIn: !state.isLoggedIn
      }
    }
  }
})

export const { setUser } = userLoggedInSlice.actions;
export default userLoggedInSlice.reducer;
export const LogInUser = (state) => state;