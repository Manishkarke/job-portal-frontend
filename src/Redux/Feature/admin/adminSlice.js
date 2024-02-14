import { createSlice } from "@reduxjs/toolkit";
import {
  changeToVendor,
  createCategory,
  deleteAVendor,
  deleteCategory,
  getAllVendor,
  rejectVendorRequest,
} from "./adminAction";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    isLoading: false,
    categories: [],
    vendors: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Vendor reducers
    builder.addCase(getAllVendor.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getAllVendor.fulfilled, (state, action) => {
      state.isLoading = false;
      state.vendors = action.payload.vendors;
      state.error = null;
    });

    builder.addCase(getAllVendor.rejected, (state) => {});

    builder.addCase(deleteAVendor.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(deleteAVendor.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload.status === 200) {
        state.vendors = state.vendors.filter(
          (vendor) => vendor.id !== action.payload.id
        );
      }
      state.error = null;
    });

    builder.addCase(deleteAVendor.rejected, (state, action) => {
      state.isLoading = false;
      state.error = true;
    });

    builder.addCase(rejectVendorRequest.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(rejectVendorRequest.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload.status === 200) {
        state.vendors = state.vendors.filter(
          (vendor) => vendor.userId !== action.payload.userId
        );
      }
    });

    builder.addCase(rejectVendorRequest.rejected, (state) => {
      state.isLoading = false;
      state.error = false;
    });

    builder.addCase(changeToVendor.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(changeToVendor.fulfilled, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(changeToVendor.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    });

    // Category Reducerss
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

    builder.addCase(deleteCategory.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload.status === 200)
        state.categories.filter(
          (category) => category.id !== action.payload.id
        );
      state.error = null;
    });
    builder.addCase(deleteCategory.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const adminReducer = adminSlice.reducer;
