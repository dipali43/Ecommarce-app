import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { StorageService } from '../../services/storage';

const initialState = {
  mode: 'light', // 'light' or 'dark'
  loading: true,
};

export const loadThemePreference = createAsyncThunk('theme/load', async () => {
  const mode = await StorageService.getTheme();
  return mode || 'system';
});

export const setThemeMode = createAsyncThunk('theme/set', async (mode) => {
  await StorageService.saveTheme(mode);
  return mode;
});

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadThemePreference.fulfilled, (state, action) => {
        state.loading = false;
        state.mode = action.payload;
      })
      .addCase(setThemeMode.fulfilled, (state, action) => {
        state.mode = action.payload;
      });
  },
});

export default themeSlice.reducer;
