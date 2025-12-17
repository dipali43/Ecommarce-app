import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { StorageService } from '../../services/storage';

const initialState = {
  history: [],
  loading: false,
};

export const loadOrders = createAsyncThunk('orders/load', async () => {
  return await StorageService.getOrders();
});

export const placeOrder = createAsyncThunk('orders/place', async (order) => {
  const currentOrders = await StorageService.getOrders();
  const newOrders = [order, ...currentOrders];
  await StorageService.saveOrders(newOrders);
  return newOrders;
});

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.history = action.payload;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.history = action.payload;
      });
  },
});

export default orderSlice.reducer;
