import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../utils/axios";
import {
  getDataFromLocalStorage,
  setDataInLocalStorage,
} from "../../../utils/localStorage";

// Reducer function for fetching user details
export const fetchProfile = createAsyncThunk("common/get-profile", async () => {
  try {
    const response = await api.get("/common/profile", {
      headers: {
        Authorization: "Bearer " + getDataFromLocalStorage("accessToken"),
      },
    });

    if (response.data.status === "success") {
      setDataInLocalStorage("user", response.data.data);
      return response.data.data;
    } else if (response.data.status === "error") {
      throw response.data.message;
    }
  } catch (err) {
    throw err;
  }
});

// Reducer function for getting categories
export const getCategories = createAsyncThunk(
  "common/getCategories",
  async () => {
    try {
      const response = await api.get("/common/category", {
        headers: {
          Authorization: "Bearer " + getDataFromLocalStorage("accessToken"),
        },
      });

      if (response.data.status === "success") {
        return response.data.data;
      } else if (response.data.status === "error") {
        throw response.data.message;
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
);
