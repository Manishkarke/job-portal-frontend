import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../../utils/axios";
import { getDataFromCookies, setDataInCookies } from "../../../../utils/cookie";

export const userRegister = createAsyncThunk(
  "auth/register",
  async ({ email, name, password }) => {
    try {
      const response = await api.post("/user/register", {
        name,
        email,
        password,
      });

      if(response.data.status === 200) {
        
      }
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ email, password }) => {
    try {
      const response = await api.post("/user/login", {
        email,
        password,
        navigate,
        toast,
      });
      setDataInCookies("accessToken", response.data.token);
      if (response.data.token) {
        toast.success(response.data.messsage);
        navigate("/");
      }
      if (response.data.status !== 200) {
        toast.error(response.data.messsage);
      }
      console.log(response.data)
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
        Authorization: "Bearer " + getDataFromCookies("accessToken"),
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
});
