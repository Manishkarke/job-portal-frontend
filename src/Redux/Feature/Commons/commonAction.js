import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../utils/axios";

export const getCategories = createAsyncThunk(
  "common/getCategories",
  async () => {
    try {
      const response = await api.get("/admin/category");

      if (response.data.status === 200) {
        return response.data.categories;
      }
    } catch (err) {
      console.error(err);
    }
  }
);
