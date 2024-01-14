import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../Feature/user/Auth/authSlice";
import { jobReducer } from "../Feature/user/Jobs/jobSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    jobs: jobReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
