import { createAsyncThunk } from "@reduxjs/toolkit";
import { api, apiImage } from "../../../utils/axios";
import { getDataFromLocalStorage } from "../../../utils/localStorage";
const token = getDataFromLocalStorage("accessToken");

// Vendor Async Thunks
export const getAllVendor = createAsyncThunk("admin/getAllVendor", async () => {
  try {
    const response = await api.get("/admin/vendors/", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    if (response.data.status === 200) {
      // setCheckVendors(true);
      return response.data;
    }
  } catch (err) {
    console.log(err);
  }
});
export const rejectVendorRequest = createAsyncThunk(
  "admin/rejectVendorRequest",
  async ({ userId, toast }) => {
    try {
      const response = await api.post(
        "/admin/rejectVendor",
        { userId },
        { headers: { Authorization: "Bearer " + token } }
      );

      if (response.data.status === 200) {
        toast.success(response.data.message);
        return { status: response.data.status, userId: userId };
      }
    } catch (err) {
      console.log(err);
    }
  }
);
export const changeToVendor = createAsyncThunk(
  "admin/acceptVendorRequest",
  async ({ userId, toast }) => {
    const response = await api.post(
      "/admin/changeToVendor",
      { userId },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    if (response.data.status === 200) {
      toast.success(response.data.message);
      return { status: response.data.status, userId: userId };
    }
  }
);
export const deleteAVendor = createAsyncThunk(
  "admin/deleteVendor",
  async ({ id, toast, checkVendor }) => {
    try {
      const response = await api.delete(`/admin/vendors/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      if (response.data.status === 200) {
        toast.success(response.data.message);
        checkVendor(true);
        return { status: response.data.status, id: id };
      }
      if (response.data.status === 404) {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  }
);

// Category Async THunks
export const createCategory = createAsyncThunk(
  "admin/createCategory",
  async ({ formData, toast, uploading, closeModal }) => {
    try {
      const response = await apiImage.post("/admin/category", formData, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      if (response.data.status === 200) {
        toast.success(response.data.message);
        uploading(true);
        closeModal(false);
      } else if (response.data.status === 400) {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "admin/deleteCategory",
  async ({ id, DeleteCategory, toast }) => {
    try {
      const response = await api.delete(`/admin/category/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      if (response.data.status === 200) {
        toast.success(response.data.message);
        DeleteCategory(true);
        return { status: response.data.status, id };
      }
      if (response.data.status === 400) {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  }
);
