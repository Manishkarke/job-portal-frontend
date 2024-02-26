import { createSlice } from "@reduxjs/toolkit";
import {
  logout,
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
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      state.isLoading = false;
      console.log(action.error);
      state.error = action.error.message;
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

    // Reducer for logging out
    builder.addCase(logout.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const authReducer = authSlice.reducer;
