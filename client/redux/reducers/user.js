import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import store from "../store";
import path from "../../util/loadAsset";

export const me = createAsyncThunk("auth/me", async () => {
  console.log("ME");
  const { data } = await axios.get(path(`/auth/me`), {
    credentials: "include",
  });
  return data;
});

function select(state) {
  return state.userPage.link;
}

export const authenticate = createAsyncThunk("auth", async (user) => {
  await axios.post(path(`/auth/${select(store.getState())}`), user);
  const { data } = await axios.get(path(`/auth/me`), {
    credentials: "include",
  });
  return data;
});

export const update = createAsyncThunk("update", async (user) => {
  const { data } = await axios.put(path(`/auth/update`), user);
  return data;
});

export const updateUserRestaurant = createAsyncThunk(
  "updateUserRestaurant",
  async (id) => {
    const { data } = await axios.put(path(`/auth/currentRestaurant/${id}`));

    return data;
  }
);

export const fetchHistory = createAsyncThunk("fetchHistory", async () => {
  const { data } = await axios.get(path(`/api/order/history`));
  console.log(data);
  return data;
});

export const logout = createAsyncThunk("user/logout", async () => {
  const { data } = await axios.delete(path(`/auth/logout`));
  return data;
});

export const leaveRestaurant = createAsyncThunk("leaveRestaurant", async () => {
  const { data } = await axios.put(path("/auth/leave"));
  return data;
});

const userAuthSlice = createSlice({
  name: "user",
  initialState: { user: {}, history: {} },
  reducers: {
    setUser(state, action) {
      return { user: action.payload };
    },
    reset(state, action) {
      const { user } = state;
      return { ...state, user: { ...user, currentRestaurantId: null } };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authenticate.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state = {};
      })
      .addCase(update.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(leaveRestaurant.fulfilled, (state, action) => {
        console.log(action.payload);
      })
      .addCase(me.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(updateUserRestaurant.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(updateUserRestaurant.rejected, (state, action) => {
        console.log(action.payload);
      })
      .addCase(fetchHistory.fulfilled, (state, action) => {
        state.history = action.payload;
      });
  },
});

//Actions
/////////////////////////////////////////////////////////////
export const { setUser, reset } = userAuthSlice.actions;

//Reducer
/////////////////////////////////////////////////////////////
export default userAuthSlice.reducer;

//Selectors
/////////////////////////////////////////////////////////////
export const getUser = (state) => state.user;
export const selectUser = (state) => state.user.user;
export const getHistory = (state) => state.user.history;
