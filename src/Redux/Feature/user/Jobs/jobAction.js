import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../../utils/axios";

export const getJobs = createAsyncThunk("jobs/getAll", async () => {
  try {
    const response = await api.get("/user/jobs");

    if (response.data.status === 200) {
      return response.data;
    }

    console.log("jobs", response.data.jobs);
  } catch (err) {
    console.log(err);
  }
});

export const getSingleJob = createAsyncThunk(
  "jobs/getSingleJob",
  async (id) => {
    try {
      const response = await api.get(`/user/jobs/${id}`);

      if (response.data.status === 200) {
        return response.data;
      }
    } catch (err) {
      console.log(err);
    }
  }
);

export const getJobsByCategory = createAsyncThunk(
  "jobs/getJobsByCategory",
  async (id) => {
    try {
      const response = await api.get(`user/jobs/category/${id}`);

      if (response.data.status === 200) {
        return response.data;
      }
    } catch (err) {
      console.log(err);
    }
  }
);
