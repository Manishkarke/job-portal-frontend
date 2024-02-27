import { createAsyncThunk } from "@reduxjs/toolkit";
import { api, apiImage } from "../../../utils/axios";
import { getDataFromLocalStorage } from "../../../utils/localStorage";

// get all vendors reducer function
export const getAllVendor = createAsyncThunk("admin/getAllVendor", async () => {
  try {
    const response = await api.get("/admin/vendors/", {
      headers: {
        Authorization: "Bearer " + getDataFromLocalStorage("accessToken"),
      },
    });

    if (response.data.status === "success") {
      // setCheckVendors(true);
      return response.data.data;
    } else if (response.data.status === "error") {
      throw response.data.message;
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
});

// reject vendor request reducer function
export const rejectVendorRequest = createAsyncThunk(
  "admin/rejectVendorRequest",
  async ({ userId, toast }) => {
    try {
      const response = await api.post(
        "/admin/rejectVendor",
        { userId },
        {
          headers: {
            Authorization: "Bearer " + getDataFromLocalStorage("accessToken"),
          },
        }
      );

      if (response.data.status === "success") {
        toast.success(response.data.message);
      } else if (response.data.status === "error") {
        toast.error(response.data.message);
        throw response.data.message;
      }
    } catch (err) {
      throw err;
    }
  }
);

// accept vendor request reducer function
export const changeToVendor = createAsyncThunk(
  "admin/acceptVendorRequest",
  async ({ userId, toast }) => {
    try {
      const response = await api.post(
        "/admin/changeToVendor",
        { userId },
        {
          headers: {
            Authorization: "Bearer " + getDataFromLocalStorage("accessToken"),
          },
        }
      );

      if (response.data.status === "success") {
        toast.success(response.data.message);
      } else if (response.data.status === "error") {
        throw response.data.message;
      }
    } catch (error) {
      throw error;
    }
  }
);

// delete a vendor reducer function
export const deleteAVendor = createAsyncThunk(
  "admin/deleteVendor",
  async ({ id, toast, checkVendor }) => {
    try {
      const response = await api.delete(`/admin/vendors/${id}`, {
        headers: {
          Authorization: "Bearer " + getDataFromLocalStorage("accessToken"),
        },
      });

      if (response.data.status === "success") {
        toast.success(response.data.message);
        checkVendor(true);
      } else if (response.data.status === "error") {
        toast.error(response.data.message);
        throw response.data.message;
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
);

// create new category reducer function
export const createCategory = createAsyncThunk(
  "admin/createCategory",
  async ({ formData, toast, uploading, closeModal }) => {
    try {
      const response = await apiImage.post("/admin/category", formData, {
        headers: {
          Authorization: "Bearer " + getDataFromLocalStorage("accessToken"),
        },
      });

      if (response.data.status === "success") {
        toast.success(response.data.message);
        uploading(true);
        closeModal(false);
      } else if (response.data.status === "error") {
        throw response.data.message.category;
      }
    } catch (err) {
      throw err;
    }
  }
);

// delete a category reducer function
export const deleteCategory = createAsyncThunk(
  "admin/deleteCategory",
  async ({ id, DeleteCategory, toast }) => {
    try {
      const response = await api.delete(`/admin/category/${id}`, {
        headers: {
          Authorization: "Bearer " + getDataFromLocalStorage("accessToken"),
        },
      });

      if (response.data.status === "success") {
        toast.success(response.data.message);
        DeleteCategory(true);
      } else if (response.data.status === "error") {
        toast.error(response.data.message);
        throw response.data.message;
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
);
