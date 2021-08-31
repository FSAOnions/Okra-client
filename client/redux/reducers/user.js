import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { State } from "@ui-kitten/components";
import axios from "axios";
import { Alert } from "react-native";
import store from "../store";
const serverUrl = "https://okra-onions.herokuapp.com";

export const me = createAsyncThunk("auth/me", async () => {
  console.log("ME");
  const { data } = await axios.get(`${serverUrl}/auth/me`, {
    credentials: "include",
  });
  return data;
});

function select(state) {
  return state.userPage.link;
}

export const authenticate = createAsyncThunk("auth", async (user) => {
  await axios.post(`${serverUrl}/auth/${select(store.getState())}`, user);
  const { data } = await axios.get(`${serverUrl}/auth/me`, {
    credentials: "include",
  });
  return data;
});

export const update = createAsyncThunk("update", async (user) => {
  const { data } = await axios.put(`${serverUrl}/auth/${id}}`, user);
  return data;
});

export const logout = () => {
  return {
    auth: { id: {} },
  };
};

const userAuthSlice = createSlice({
  name: "user",
  initialState: {},
  reducer: {
    setUser(state, action) {
      return { user: action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authenticate.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(update.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(me.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

//Actions
/////////////////////////////////////////////////////////////
export const { setUser } = userAuthSlice.actions;

//Reducer
/////////////////////////////////////////////////////////////
export default userAuthSlice.reducer;

//Selectors
/////////////////////////////////////////////////////////////
export const getUser = (state) => state.user;
export const selectUser = (state) => state.user.user;
