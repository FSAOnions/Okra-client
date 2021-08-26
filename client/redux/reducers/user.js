import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const serverUrl = "https://okra-onions.herokuapp.com";

const TOKEN = "token";

//
export const me = createAsyncThunk("auth/me", async () => {
  const token = await AsyncStorage.getItem("TASKS");
  if (token) {
    const { data } = await axios.get(`${serverUrl}/auth/me`, {
      headers: {
        authorization: token,
      },
    });
    return data;
  }
});

//${serverUrl}
export const authenticate = createAsyncThunk(
  "auth/login",
  async ({ email, password }) => {
    console.log("Auth", email, password);
    const {data} = await axios.post(`${serverUrl}/auth/login`, { email, password });
    console.log("Res", data);
    await AsyncStorage.setItem(TOKEN, data.token);
    dispatch(me());
    return data
  }
);

export const logout = () => {
  AsyncStorage.removeItem(TOKEN);
  return {
    auth: { id: {} },
  };
};

const userAuthSlice = createSlice({
  name: "user",
  initialState: { user: {}, token: "" },
  reducer: {
    setUser(state, action) {
      return { user: action.payload };
    },
    setToken(state, action) {
      return { token: action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(me.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(me.rejected, (state, action) => {
        console.log(action.payload);
      })
      .addCase(authenticate.fulfilled, (state, action) => {
        state.token=action.payload
      })
      .addCase(authenticate.rejected, (state, action) => {
        console.log(action.payload);
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
