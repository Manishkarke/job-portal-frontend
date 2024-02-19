import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../utils/axios";
import { getDataFromLocalStorage } from "../../../utils/localStorage";
import { toast } from "react-toastify";

// create job Redux function
export const postJob = createAsyncThunk(
  "vendor/createJob",
  async ({ formData, toast, navigate }) => {
    try {
      const response = await api.post("/vendor/jobs", formData, {
        headers: {
          Authorization: "Bearer " + getDataFromLocalStorage("accessToken"),
        },
      });

      if (response.data.status === "success") {
        toast.success(response.data.message);
        navigate("/vendor/jobs");
      } else if (response.data.status === "error") {
        if (typeof response.data.message === "object") {
          throw response.data.message;
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      throw error;
    }
  }
);

// view my jobs redux function
export const myJobs = createAsyncThunk("vendor/jobs", async () => {
  try {
    const response = await api.get("/vendor/jobs", {
      headers: {
        Authorization: "Bearer " + getDataFromLocalStorage("accessToken"),
      },
    });

    if (response.data.status === "success") {
      return response.data.data;
    } else if (response.data.status === "error") {
      toast.error(response.data.message);
      throw response.data.message;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
});

// View single job redux function
export const getSingleJob = createAsyncThunk("vendor/singlejob", async (id) => {
  try {
    const response = await api.get(`/vendor/jobs/${id}`, {
      headers: {
        Authorization: "Bearer " + getDataFromLocalStorage("accessToken"),
      },
    });

    if (response.data.status === "success") {
      return response.data.data;
    } else if (response.data.status === "error") {
      toast.error(response.data.message);
      throw response.data.message;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
});

// Delete a posted job redux function
export const deleteJob = createAsyncThunk(
  "vendor/deleteSingleJob",
  async ({id, toast, navigate}) => {
    try {
      const response = await api.delete(`/vendor/jobs/${id}`, {
        headers: {
          Authorization: "Bearer " + getDataFromLocalStorage("accessToken"),
        },
      });

      if (response.data.status === "success") {
        toast.success(response.data.message);
        navigate("/vendor");
      } else if (response.data.status === "error") {
        toast.error(response.data.message);
        navigate("/vendor");
      }
    } catch (e) {
      console.error(e);
    }
  }
);

// get all the applicants
export const getApplicants = createAsyncThunk(
  "vendor/getApplicants",
  async () => {
    try {
      const response = await api.get("/vendor/applicants", {
        headers: {
          Authorization: "Bearer " + getDataFromLocalStorage("accessToken"),
        },
      });

      if (response.data.status === "success") {
        return response.data.data;
      } else if (response.data.status === "error") {
        toast.error(response.data.message);
        throw response.data.message;
      }
    } catch (error) {
      throw error;
    }
  }
);

// TODO: Might add one more async thunk function here
