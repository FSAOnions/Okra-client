import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const serverUrl = "https://okra-onions.herokuapp.com";

//
// export const me = createAsyncThunk("auth/me", async (token) => {
//   // const token =  await AsyncStorage.getItem("token");
//   console.log("tokenME",token)
//   if (token) {

//     const { data } = await axios.get(`https://okra-onions.herokuapp.com/auth/me`, {
//       headers: {
//         authorization: token,
//       },
//     });
//     console.log("ME", data)
//     return data;
//   }
// });

export const authenticate = createAsyncThunk(
  "auth/login",
  async ({ email, password }) => {
    const { data } = await axios.post(`${serverUrl}/auth/login`, {
      email,
      password,
    });
    if (data.token) {
      const { data: user } = await axios.get(`${serverUrl}/auth/me`, {
        headers: {
          authorization: data.token,
        },
      });
      return user;
    }
  }
);

export const signup = createAsyncThunk("auth/signup", async (user) => {
  const { data } = await axios.post(`${serverUrl}/auth/signup`, user);
  if (data.token) {
    const { data: user } = await axios.get(`${serverUrl}/auth/me`, {
      headers: {
        authorization: data.token,
      },
    });
    return user;
  }
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
      .addCase(signup.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(authenticate.rejected, (state, action) => {
        console.log("ALERT");
      })
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
