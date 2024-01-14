import { createSlice } from "@reduxjs/toolkit";
import { getAllVendor } from "./adminAction";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    isLoading: false,
    categories: null,
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

    builder.addCase(getAllVendor.rejected, (state, ) => {

    })
  },
});

export const adminReducer = adminSlice.reducer;
