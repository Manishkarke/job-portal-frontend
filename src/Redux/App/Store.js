import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../Feature/user/Auth/authSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
