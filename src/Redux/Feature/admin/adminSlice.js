import { createSlice } from "@reduxjs/toolkit";
import { createCategory, getAllCategory, getAllVendor } from "./adminAction";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    isLoading: false,
    categories: [],
    vendors: null,
    vendorRequests: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllVendor.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getAllVendor.fulfilled, (state, action) => {
      state.isLoading = false;
      state.vendors = vendor;
      state.error = null;
    });

    builder.addCase(getAllVendor.rejected, (state) => {});

    builder.addCase(createCategory.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(createCategory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
    });

    builder.addCase(createCategory.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload?.error;
    });

    builder.addCase(getAllCategory.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getAllCategory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.categories = action.payload.categories;
      state.error = null;
    });

    builder.addCase(getAllCategory.rejected, (state, action) => {
      state.isLoading = false;
      console.log("Something went wrong");
      // state.error = null;
    });
  },
});

export const adminReducer = adminSlice.reducer;
