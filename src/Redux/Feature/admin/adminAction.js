import { createAsyncThunk } from "@reduxjs/toolkit";
import { api, apiImage } from "../../../utils/axios";
import { getDataFromLocalStorage } from "../../../utils/localStorage";
const token = getDataFromLocalStorage("accessToken");

export const getAllVendor = createAsyncThunk("admin/getAllVendor", async () => {
  try {
    const response = await api.get("/admin/vendors/", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    if (response.data.status === 200) {
      return response.data;
    }
  } catch (err) {
    console.log(err);
  }
});

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

export const getAllCategory = createAsyncThunk(
  "admin/getCategories",
  async () => {
    try {
      const response = await api.get("/admin/category/", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      if (response.data.status === 200) {
        return response.data;
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
      }
      if (response.data.status === 400) {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  }
);
