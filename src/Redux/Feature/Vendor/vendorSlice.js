import { createSlice } from "@reduxjs/toolkit";
import {
  deleteJob,
  getApplicants,
  getSingleJob,
  myJobs,
  postJob,
} from "./vendorAction";

const vendorSlice = createSlice({
  name: "vendor",
  initialState: {
    isLoading: false,
    applicants: [],
    postedJobs: [],
    singlePostedJob: {},
    error: null,
  },
  extraReducers: (builder) => {
    // Reducer for posting job
    builder.addCase(postJob.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(postJob.fulfilled, (state) => {
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(postJob.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });

    // Reducer for view posted jobs
    builder.addCase(myJobs.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(myJobs.fulfilled, (state, action) => {
      state.isLoading = false;
      state.postedJobs = action.payload;
      state.error = null;
    });
    builder.addCase(myJobs.rejected, (state, action) => {
      state.isLoading = false;
      console.log(action.error.message);
      state.error = action.error.message;
    });

    // Reducer for getting single job
    builder.addCase(getSingleJob.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getSingleJob.fulfilled, (state, action) => {
      state.isLoading = false;
      state.singlePostedJob = action.payload;
    });
    builder.addCase(getSingleJob.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });

    // Reducer for deleting posted job
    builder.addCase(deleteJob.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(deleteJob.fulfilled, (state) => {
      state.isLoading = false;
      state.singlePostedJob = {};
    });
    builder.addCase(deleteJob.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });

    // Reducer for getting applicant list
    builder.addCase(getApplicants.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getApplicants.fulfilled, (state, action) => {
      state.isLoading = false;
      state.applicants = action.payload;
    });
    builder.addCase(getApplicants.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const vendorReducer = vendorSlice.reducer;
