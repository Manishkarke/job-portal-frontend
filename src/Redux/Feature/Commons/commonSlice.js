import { createSlice } from "@reduxjs/toolkit";
import { getCategories } from "./commonAction";

const commonSlice = createSlice({
  initialState: { isLoading: false, categories: [], error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategories.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.isLoading = false;
      state.categories = action.payload;
      console.log(action.payload);
    });
    builder.addCase(getCategories.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const commonReducer = commonSlice.reducer;