import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../../utils/axios";
import {
  getDataFromLocalStorage,
  setDataInLocalStorage,
} from "../../../../utils/localStorage";

export const userRegister = createAsyncThunk(
  "auth/register",
  async ({ email, name, password, navigate, toast }) => {
    try {
      const response = await api.post("/user/register", {
        name,
        email,
        password,
      });

      if (response.data.status === 200) {
        toast.success(response.data.message);
        console.log(response.data.message);
        navigate("/login");
      }
      if (response.data.status !== 200) {
        toast.error(response.data.message);
      }
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ email, password, navigate, toast }) => {
    try {
      const response = await api.post("/user/login", {
        email,
        password,
      });
      setDataInLocalStorage("accessToken", response.data.token);

      if (response.data.status === 200) {
        toast.success(response.data.message);
        navigate("/");
      }

      if (response.data.status === 400) {
        toast.error(response.data.message);
        console.log(response.data);
      }
      // if (response.data.success === 400) {
      //   console.log(toast)
      //   toast.error(response.data.messsage);
      //   console.log(response.data);
      // }
      console.log(response.data);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const fetchProfile = createAsyncThunk("get/profile", async () => {
  try {
    const response = await api.get("/user/profile", {
      headers: {
        Authorization: "Bearer " + getDataFromLocalStorage("accessToken"),
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
});
