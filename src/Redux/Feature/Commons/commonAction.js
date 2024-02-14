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
    }

    if (response.data.status === "error") {
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
      const response = await api.get("/common/category");

      if (response.data.status === "success") {
        console.log(response.data.data);
        return response.data.data;
      }
      if (response.data.status === "error") {
        throw response.data.message;
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
);
