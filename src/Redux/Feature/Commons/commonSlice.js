import { createSlice } from "@reduxjs/toolkit";
import { fetchProfile, getCategories } from "./commonAction";

const commonSlice = createSlice({
  name: "common",
  initialState: { isLoading: false, user: {}, categories: [], error: null },
  reducers: {},
  extraReducers: (builder) => {
    // Reducer for fetching profile
    builder.addCase(fetchProfile.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProfile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.error = null;
    });
    builder.addCase(fetchProfile.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
    // Reducer for getting categories
    builder.addCase(getCategories.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.isLoading = false;
      state.categories = action.payload;
      state.error = null;
    });
    builder.addCase(getCategories.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const commonReducer = commonSlice.reducer;
