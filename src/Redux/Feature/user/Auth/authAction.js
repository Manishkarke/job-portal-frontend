import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../../utils/axios";
import { getDataFromCookies, setDataInCookies } from "../../../../utils/cookie";
import { toast } from "react-toastify";

export const userRegister = createAsyncThunk(
  "auth/register",
  async ({ email, name, password }) => {
    try {
      const response = await api.post("/user/register", {
        name,
        email,
        password,
      });

      if (response.data.status === 200) {
      }
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ email, password, navigate }) => {
    try {
      const response = await api.post("/user/login", {
        email,
        password,
      });
      setDataInCookies("accessToken", response.data.token);

      // TODO: Error Here Fixing needed
      if (response.data.status === 200) {
        toast.success(response.data.messsage);
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
        Authorization: "Bearer " + getDataFromCookies("accessToken"),
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
});
