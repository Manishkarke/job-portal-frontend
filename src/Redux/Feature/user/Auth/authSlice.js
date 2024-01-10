import { createSlice } from "@reduxjs/toolkit";
import { fetchProfile, userLogin, userRegister } from "./authAction";
import {
  getDataFromLocalStorage,
  removeDataFromLocalStorage,
} from "../../../../utils/localStorage";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoading: true,
    user: [],
    token: getDataFromLocalStorage("accessToken") || null,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.isLoading = false;
      state.token = null;
      removeDataFromLocalStorage("accessToken");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userRegister.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(userRegister.fulfilled, (state) => {
      state.isLoading = false;
    });

    builder.addCase(userRegister.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.message;
    });
    builder.addCase(userLogin.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.token = null;
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      console.log(action)
      state.isLoading = false;
      // state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      state.isLoading = false;
      state.token = null;
      state.user = null;
      state.error = action.payload.message;
    });
    builder.addCase(fetchProfile.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchProfile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.error = null;
    });
    builder.addCase(fetchProfile.rejected, (state, action) => {
      state.isLoading = false;
      state.user = null;
    });
  },
});

// export const { }
export const authReducer = authSlice.reducer;
