import { configureStore } from "@reduxjs/toolkit";
import { adminReducer } from "../Feature/admin/adminSlice";
import { commonReducer } from "../Feature/Commons/commonSlice";
import { authReducer } from "../Feature/auth/authSlice";
import { userReducer } from "../Feature/user/userSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    admin: adminReducer,
    common: commonReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
