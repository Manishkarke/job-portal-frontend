import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../utils/axios";
import { getDataFromLocalStorage } from "../../../utils/localStorage";

export const getAllVendor = createAsyncThunk("admin/getAllVendor", async () => {
  try {
    const token = getDataFromLocalStorage("accessToken");
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
