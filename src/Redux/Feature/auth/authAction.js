import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../utils/axios";
import {
  getDataFromLocalStorage,
  removeDataFromLocalStorage,
  setDataInLocalStorage,
} from "../../../utils/localStorage";

// User registration reducer function
export const userRegister = createAsyncThunk(
  "auth/register",
  async ({ email, name, password, navigate, toast }, thunkAPI) => {
    try {
      const response = await api.post("/auth/register", {
        name,
        email,
        password,
      });

      if (response.data.status === "success") {
        toast.success(response.data.message);
        setDataInLocalStorage("email", email);
        navigate("/verify");
      }
      if (response.data.status === "error") {
        if (typeof response.data.message === "object") {
          throw response.data.message;
        } else {
          if (
            response.data.message === "User already exist but is not verified"
          ) {
            toast.error(response.data.message);
            navigate("/verify");
          } else if (response.data.message === "User already exist.") {
            toast.error(response.data.message);
            navigate("/login");
          }
          console.log("error is an string");
        }
      }
      //   return response.data;
    } catch (err) {
      console.log("Error here: ", err);
      throw err;
    }
  }
);

// Verify registration reducer function
export const verifyRegistration = createAsyncThunk(
  "auth/verify",
  async ({ otp, email, navigate, toast }) => {
    try {
      const response = await api.post("/auth/verify-registration", {
        otp,
        email,
      });

      if (response.data.status === "success") {
        removeDataFromLocalStorage("email");
        toast.success(response.data.message);
        navigate("/login");
      }

      if (response.data.status === "error") {
        toast.error(response.data.message);
        throw new Error(response.data.message);
      }
    } catch (error) {
      throw error;
    }
  }
);

// User log in reducer function
export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ email, password, navigate, toast }) => {
    try {
      const response = await api.post("/auth/sign-in", {
        email,
        password,
      });

      if (response.data.status === "success") {
        setDataInLocalStorage("accessToken", response.data.data.accessToken);
        setDataInLocalStorage("role", response.data.data.user.role);
        setDataInLocalStorage("user", JSON.stringify(response.data.data.user));
        toast.success(response.data.message);

        // Since this only happen if the status is success
        if (response.data.data.user.role === "user") {
          navigate("/");
        } else if (response.data.data.user.role === "admin") {
          navigate("/admin");
        } else if (response.data.data.user.role === "vendor") {
          navigate("/vendor");
        }
      }

      if (response.data.status === "error") {
        if (typeof response.data.message === "object") {
          throw response.data.message;
        } else if (response.data.message === "The email is not verified.") {
          toast.error(response.data.message);
          navigate("/verify");
        } else {
          throw response.data.message;
        }
      }
    } catch (err) {
      throw err;
    }
  }
);

// Send otp reducer function
export const sendOtp = createAsyncThunk(
  "auth/sendOtp",
  async ({ email, toast, navigate }) => {
    try {
      const response = await api.post("/auth/send-otp", { email });
      if (response.data.status === "success") {
        toast.success(response.data.message);
        setDataInLocalStorage("email", email);
        navigate("/verify-otp");
      }
      if (response.data.status === "error") {
        throw new Error(response.data.message);
      }
    } catch (err) {
      throw err;
    }
  }
);

// Verify otp reducer function
export const verifyOtp = createAsyncThunk(
  "auth/verify-otp",
  async ({ email, otp, toast, navigate }) => {
    try {
      const response = await api.post("/auth/verify-otp", { email, otp });

      if (response.data.status === "success") {
        toast.success(response.data.message);
        setDataInLocalStorage("otp", otp);
        navigate("/reset-password");
      } else if (response.data.status === "error") {
        throw new Error(response.data.message);
      }
    } catch (err) {
      throw err;
    }
  }
);

// Reset password reducer function
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ email, otp, password, navigate, toast }) => {
    try {
      const response = await api.post("/auth/reset-password", {
        otp,
        email,
        password,
      });

      if (response.data.status === "success") {
        toast.success(response.data.message);
        removeDataFromLocalStorage("email");
        removeDataFromLocalStorage("otp");
        navigate("/login");
      } else if (response.data.status === "error") {
        throw new Error(response.data.message);
      }
    } catch (err) {
      throw err;
    }
  }
);

// Generate new access Token from refresh token
export const generateNewAccessToken = createAsyncThunk(
  "auth/generateAccessToken",
  async () => {}
);

// Log out reducer function
export const logout = createAsyncThunk(
  "auth/logout",
  async ({navigate, toast}) => {
    try {
      const response = await api.post(
        "/auth/log-out",
        {},
        {
          headers: {
            Authorization: "Bearer " + getDataFromLocalStorage("accessToken"),
          },
        }
      );

      if (response.data.status === "success") {
        removeDataFromLocalStorage("accessToken");
        removeDataFromLocalStorage("role");
        removeDataFromLocalStorage("user");
        toast.success(response.data.message);
        navigate("/login");
        console.log("hellowoewj");
      } else if (response.data.status === "error") {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);
