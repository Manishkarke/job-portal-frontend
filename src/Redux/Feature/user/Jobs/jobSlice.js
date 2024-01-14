import { createSlice } from "@reduxjs/toolkit";
import { getJobs, getJobsByCategory, getSingleJob } from "./jobAction";

const jobsSlice = createSlice({
  name: "jobs",
  initialState: {
    isLoading: false,
    jobs: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Actions for getting all jobs
    builder.addCase(getJobs.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getJobs.fulfilled, (state, action) => {
      state.isLoading = false;
      state.jobs = action.payload.jobs;
      state.error = null;
    });
    builder.addCase(getJobs.rejected, (state, action) => {
      state.isLoading = false;
      state.jobs = null;
      state.error = null;
    });

    // Action for Getting Single job
    builder.addCase(getSingleJob.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getSingleJob.fulfilled, (state, action) => {
      state.isLoading = false;
      state.jobs = action.payload.jobs;
      state.error = null;
    });
    builder.addCase(getSingleJob.rejected, (state, action) => {
      state.isLoading = false;
      state.jobs = null;
      state.error = action.payload.message;
    });

    // Action for getting categories
    builder.addCase(getJobsByCategory.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getJobsByCategory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.jobs = action.payload.jobs;
    });
    builder.addCase(getJobsByCategory.rejected, (state, action) => {
      // TODO: Need to work here
    })
    //
  },
});

export const jobReducer = jobsSlice.reducer;
