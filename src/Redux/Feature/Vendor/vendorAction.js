import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../utils/axios";
import { getDataFromLocalStorage } from "../../../utils/localStorage";
const accessToken = getDataFromLocalStorage("acccessToken");

export const postJob = createAsyncThunk(
  "vendor/createJob",
  async ({ formData, toast, navigate }) => {
    try {
      const response = await api.post("/vendor/jobs", formData, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });

      if (response.data.status === 200) {
        toast.success(response.data.message);
        navigate("/vendor");
      }
    } catch (e) {
      console.error(e);
    }
  }
);

export const myJobs = createAsyncThunk("vendor/jobs", async () => {
  try {
    const response = await api.get("/vendor/jobs", {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });

    if (response.data.status === 200) {
      return response.data.jobs;
    }
  } catch (e) {
    console.error(e);
  }
});

export const getSingleJob = createAsyncThunk("vendor/singlejob", async (id) => {
  try {
    const response = await api.get(`/vendor/jobs/${id}`, {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });

    if (response.data.status === 200) {
      return response.data.data;
    }
  } catch (e) {
    console.error(e);
  }
});

export const deleteSingleJob = createAsyncThunk(
  "vendor/deleteSingleJob",
  async (id, toast, navigate) => {
    try {
      const response = await api.delete(`/vendor/jobs/${id}`, {
        headers: { Authorization: "Bearer " + accessToken },
      });

      if (response.data.status === 200) {
        toast.success(response.data.message);
        navigate("/vendor")
      }
    } catch (e) {
      console.error(e);
    }
  }
);

// TODO: Handle api of all routes
