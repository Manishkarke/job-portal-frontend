import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { getDataFromLocalStorage } from "../utils/localStorage";
import Dashboard from "../Pages/Users/Dashboard/Dashboard";
import { JobList } from "../Pages/Users/Jobs/JobList";
import { Profile } from "../Pages/Users/Profile/Profile";
import { AdminDashboard } from "../Pages/Admin/Dashboard/AdminDashboard";
import { VendorDashboard } from "../Pages/Vendor/Dashboard/VendorDashboard";
import Login from '../Pages/Common/Login/Login';
import Register from "../Pages/Common/Register/Register";

export default function Router() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="/jobs" element={<JobList />} />

        {/* Vendor ROutes */}
        {/* Vendor ROutes */}
        {/* Vendor ROutes */}
        <Route
          path="/vendor"
          element={
            <ProtectedRoute>
              <VendorDashboard />
            </ProtectedRoute>
          }
        />

        {/* Admin ROutes */}
        {/* Admin ROutes */}
        {/* Admin ROutes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Common ROutes  */}
        {/* Common ROutes  */}
        {/* Common ROutes  */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

const ProtectedRoute = ({ children }) => {
  const token = getDataFromLocalStorage("accessToken");
  if (token === null) {
    return <Navigate to={"/login"} />;
  }
  return token && children;
};
