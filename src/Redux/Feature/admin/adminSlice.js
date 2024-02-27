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
    // reducer for getting all vendors
    builder.addCase(getAllVendor.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getAllVendor.fulfilled, (state, action) => {
      state.isLoading = false;
      state.vendors = action.payload;
    });
    builder.addCase(getAllVendor.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });

    // Reducer for rejecting a vendor request
    builder.addCase(rejectVendorRequest.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(rejectVendorRequest.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(rejectVendorRequest.rejected, (state) => {
      state.isLoading = false;
      state.error = action.error;
    });

    // Reducer for accepting a vendor request
    builder.addCase(changeToVendor.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(changeToVendor.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(changeToVendor.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });

    // Reducer for deleting a vendor
    builder.addCase(deleteAVendor.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(deleteAVendor.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(deleteAVendor.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });

    // Reducer for creating new category
    builder.addCase(createCategory.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(createCategory.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(createCategory.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    // Reducer for deleting category
    builder.addCase(deleteCategory.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(deleteCategory.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const adminReducer = adminSlice.reducer;
