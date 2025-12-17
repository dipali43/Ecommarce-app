import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { StorageService } from '../../services/storage';

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true, // Start loading to check auth status
};

export const checkAuthStatus = createAsyncThunk('auth/checkStatus', async () => {
  const user = await StorageService.getUser();
  return user;
});

export const loginUser = createAsyncThunk('auth/login', async (user) => {
  console.log('Logging in user (Thunk):', user);
  await StorageService.saveUser(user);
  return user;
});

export const logoutUser = createAsyncThunk('auth/logout', async () => {
  await StorageService.clearUser();
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = !!action.payload;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export default authSlice.reducer;
