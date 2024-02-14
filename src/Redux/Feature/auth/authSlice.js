import { createSlice } from "@reduxjs/toolkit";
import { getDataFromLocalStorage } from "../../../utils/localStorage";
import {
  resetPassword,
  sendOtp,
  userLogin,
  userRegister,
  verifyOtp,
  verifyRegistration,
} from "./authAction";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoading: false,
    error: null,
  },
  reducers: {
    logout: () => {
      removeDataFromLocalStorage("accessToken");
      removeDataFromLocalStorage("role");
      removeDataFromLocalStorage("user");
      toast.success("Logged out successfully");
    },
  },
  extraReducers: (builder) => {
    // Reducer for registration
    builder.addCase(userRegister.pending, (state) => {
      state.isLoading = true;
      state.user = null;
      state.error = null;
    });
    builder.addCase(userRegister.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(userRegister.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });

    // Reducer for verifying registration
    builder.addCase(verifyRegistration.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(verifyRegistration.fulfilled, (state) => {
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(verifyRegistration.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });

    // Reducer for sign in
    builder.addCase(userLogin.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      console.log("action.payload: ", action.payload);
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });

    // Reducer for sending otp
    builder.addCase(sendOtp.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(sendOtp.fulfilled, (state) => {
      state.isLoading = false;
      state.error = false;
    });
    builder.addCase(sendOtp.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });

    // Reducer for verifying otp
    builder.addCase(verifyOtp.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(verifyOtp.fulfilled, (state) => {
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(verifyOtp.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });

    // Reducer for reseting password
    builder.addCase(resetPassword.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(resetPassword.fulfilled, (state) => {
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(resetPassword.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const { logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
