import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

// import AsyncStorage  from '@react-native-async-storage/async-storage';
// import SyncStorage from 'sync-storage';

const serverUrl = "https://okra-onions.herokuapp.com";

const TOKEN = "token";

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

//${serverUrl}
export const authenticate = createAsyncThunk(
  "auth/login",
  async ({ email, password }) => {
    const {data} = await axios.post(`${serverUrl}/auth/login`, {email, password});
    //  const store=  await AsyncStorage.setItem(TOKEN, data.token);
    console.log("1<-", data)
    if (data.token) {
console.log("2<-", data)
      const { data: user } = await axios.get(`${serverUrl}/auth/me`, {
        headers: {
          authorization: data.token,
        },
      });
      console.log("ME", user)
      return user;
  }}
);

export const logout = () => {
  //SyncStorage.removeItem(TOKEN);
  return {
    auth: { id: {} },
  };
};

const userAuthSlice = createSlice({
  name: "user",
  initialState: {},
  reducer: {
    setUser(state, action) {
      return {user: action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authenticate.fulfilled, (state, action) => {
        state.user = action.payload;
      })
       .addCase(authenticate.rejected, (state, action) => {
        console.log("ALERT");
      })
      // .addCase(me.fulfilled, (state, action) => {
      //   state.user = action.payload;
      // })
      // .addCase(me.rejected, (state, action) => {
      //   console.log(action.payload);
      // })
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
