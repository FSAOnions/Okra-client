import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const serverUrl = "https://okra-onions.herokuapp.com";

//Thunks
export const createBill = createAsyncThunk(
  "createBill",
  async (restaurantId) => {
    const { data } = await axios.get(`${serverUrl}/api/bill/${restaurantId}`);

    return data;
  }
);

export const addOrderItems = createAsyncThunk(
  "addOrderItems",
  async (orderItems) => {
    const { data } = await axios.post(
      `${serverUrl}/api/bill/addToBill`,
      orderItems
    );

    return data;
  }
);

export const payBill = createAsyncThunk("payBill", async () => {
  const { data } = await axios.put(`${serverUrl}/api/bill/payBill`);

  return data;
});

const INIT_STATE = {};
//Slice
/////////////////////////////////////////////////////////////
const billSlice = createSlice({
  name: "bill",
  initialState: {
    loading: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(createBill.fulfilled, (state, action) => {
        console.log(action.payload);
      })
      .addCase(createBill.rejected, (state, action) => {
        console.log(action.payload);
      })
      .addCase(addOrderItems.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addOrderItems.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(addOrderItems.rejected, (state, action) => {
        console.log(action.payload);
      })
      .addCase(payBill.fulfilled, (state, action) => {
        console.log(action.payload);
      })
      .addCase(payBill.rejected, (state, action) => {
        console.log(action.payload);
      });
  },
});

//Actions
/////////////////////////////////////////////////////////////
// export const { setCartItems, setItem, deleteItem, clearUserCart } =
//   userBillSlice.actions;

//Reducer
/////////////////////////////////////////////////////////////
export default billSlice.reducer;

//Selectors
/////////////////////////////////////////////////////////////
export const selectBill = (state) => state.bill;
