import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../Feature/user/Auth/authSlice";
import { jobReducer } from "../Feature/user/Jobs/jobSlice";
import { adminReducer } from "../Feature/admin/adminSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    jobs: jobReducer,
    admin: adminReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
