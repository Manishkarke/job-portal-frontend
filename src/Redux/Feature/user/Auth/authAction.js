import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../../utils/axios";
import {
  getDataFromLocalStorage,
  removeDataFromLocalStorage,
  setDataInLocalStorage,
} from "../../../../utils/localStorage";
import { data } from "autoprefixer";

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
        setDataInLocalStorage("email", email);
        navigate("/verify");
      }
      if (response.data.status !== 200) {
        if (
          response.data.message ===
          "User is already registered but not verified."
        ) {
          toast.error(response.data.message);
          navigate("/verify");
        } else if (response.data.message === "User is already registered.") {
          toast.error(response.data.message);
          navigate("/login");
        } else {
          toast.error(response.data.message);
        }
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
      console.log("calling log in function");
      const response = await api.post("/user/login", {
        email,
        password,
      });

      if (response.data.status === 200) {
        setDataInLocalStorage("accessToken", response.data.token);
        setDataInLocalStorage("role", response.data.role);
        setDataInLocalStorage(
          "user",
          JSON.stringify(response.data.emailExists)
        );
        toast.success(response.data.message);
      }

      if (response.data.role === "user") {
        navigate("/");
      } else if (response.data.role === "admin") {
        navigate("/admin");
      } else if (response.data.role === "vendor") {
        navigate("/vendor");
      }

      if (response.data.status === 400) {
        if (response.data.message === "The email is not verified.") {
          toast.error(response.data.message);
          navigate("/verify");
        } else {
          toast.error(response.data.message);
        }
      }
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const verifyEmail = createAsyncThunk(
  "auth/verify",
  async ({ otp, email, navigate, toast }) => {
    try {
      const response = await api.post("/user/verifyEmail", { otp, email });

      if (response.data.status === 200) {
        removeDataFromLocalStorage("email");
        toast.success(response.data.message);
        navigate("/login");
      }
      console.log(response.data.message);
      console.log(response.data.message);

      if (response.data.status !== 200) {
        toast.error(response.data.message);
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      throw error;
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

export const requestToBeVendor = createAsyncThunk(
  "auth/requestToBeVendor",
  async (
    // { name, email, designation, service, contact, address },
    { formData, toast, navigate }
  ) => {
    try {
      const response = await api.post("/user/registerAsVendor/", formData, {
        headers: {
          Authorization: "Bearer " + getDataFromLocalStorage("accessToken"),
        },
      });

      if (response.data.status === 200) {
        toast.success(response.data.message);
        navigate("/");
      } else if (response.data.status === 400) {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  }
);
