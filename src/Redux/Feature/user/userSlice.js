import { createSlice } from "@reduxjs/toolkit";
import {
  getJobs,
  getJobsByCategory,
  getSingleJob,
  requestToBeVendor,
} from "./userAction";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoading: false,
    jobs: [],
    singleJob: {},
    appliedJobs: [],
    error: null,
  },
  extraReducers: (builder) => {
    // Reducer for request to be vendor
    builder.addCase(requestToBeVendor.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(requestToBeVendor.fulfilled, (state) => {
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(requestToBeVendor.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });

    // Reducer for get jobs
    builder.addCase(getJobs.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getJobs.fulfilled, (state, action) => {
      state.isLoading = false;
      state.jobs = action.payload;
      state.error = null;
    });
    builder.addCase(getJobs.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });

    // Reducer for getting single job
    builder.addCase(getSingleJob.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getSingleJob.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.singleJob = action.payload;
    });
    builder.addCase(getSingleJob.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });

    // Reducer for getting job by category
    builder.addCase(getJobsByCategory.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getJobsByCategory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.jobs = action.payload;
      state.error = null;
    });
    builder.addCase(getJobsByCategory.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const userReducer = userSlice.reducer;
