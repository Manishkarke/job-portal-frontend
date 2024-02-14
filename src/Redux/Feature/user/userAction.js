import { createAsyncThunk } from "@reduxjs/toolkit";

// Vendor request reducer function
export const requestToBeVendor = createAsyncThunk(
  "user/requestToBeVendor",
  async ({ formData, toast, navigate }) => {
    try {
      const response = await api.post("/user/registerAsVendor/", formData, {
        headers: {
          Authorization: "Bearer " + getDataFromLocalStorage("accessToken"),
        },
      });

      if (response.data.status === "success") {
        toast.success(response.data.message);
        navigate("/");
      } else if (response.data.status === "error") {
        if (typeof response.data.message === "object") {
          throw response.data.message;
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (err) {
      throw err;
    }
  }
);

// Get job reducer function
export const getJobs = createAsyncThunk("user/getAllJobs", async () => {
  try {
    const response = await api.get("/user/jobs");

    if (response.data.status === "success") {
      return response.data.data;
    } else if (response.data.status === "error") {
      throw response.data.message;
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
});

// get single Job reducer function
export const getSingleJob = createAsyncThunk(
  "user/getSingleJob",
  async (id) => {
    try {
      const response = await api.get(`/user/jobs/${id}`);

      if (response.data.status === "success") {
        return response.data.data;
      } else if (response.data.status === "error") {
        throw response.data.message;
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
);

// Get Job by category reducer function
export const getJobsByCategory = createAsyncThunk(
  "user/getJobsByCategory",
  async (id) => {
    try {
      const response = await api.get(`user/jobs/category/${id}`);

      if (response.data.status === "success") {
        return response.data.data;
      } else if (response.data.status === "error") {
        throw response.data.message;
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
);
