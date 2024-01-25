import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { getDataFromLocalStorage } from "../utils/localStorage";
import Dashboard from "../Pages/Users/Dashboard/Dashboard";
import { JobList } from "../Pages/Users/Jobs/JobList";
import { Profile } from "../Pages/Users/Profile/Profile";
import { AdminDashboard } from "../Pages/Admin/Dashboard/AdminDashboard";
import { VendorDashboard } from "../Pages/Vendor/Dashboard/VendorDashboard";
import Login from "../Pages/Common/Login/Login";
import Register from "../Pages/Common/Register/Register";
import { AdminCategory } from "../Pages/Admin/Category/AdminCategory";
import { UserLayout } from "../Layouts/UserLayout";
import { ProfilePageLayout } from "../Layouts/ProfilePageLayout";

export default function Router() {
  const [userType, setUserType] = useState(null);
  useEffect(() => {
    const storedUserType = getDataFromLocalStorage("role");
    if (storedUserType) {
      setUserType(storedUserType);
    }
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route index={true} element={<JobList />} />
          <Route path="user" element={<ProfilePageLayout />}>
            <Route
              path="profile"
              element={
                <ProtectedRoute userType={userType} allowedUserType="user">
                  <Profile />
                </ProtectedRoute>
              }
            />
          </Route>
        </Route>

        {/* Vendor ROutes */}
        {/* Vendor ROutes */}
        {/* Vendor ROutes */}
        <Route
          path="/vendor"
          element={
            <ProtectedRoute userType={userType} allowedUserType="vendor">
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
            <ProtectedRoute userType={userType} allowedUserType="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/category/"
          element={
            <ProtectedRoute userType={userType} allowedUserType="admin">
              <AdminCategory />
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

const ProtectedRoute = ({ children, allowedUserType, userType }) => {
  const token = getDataFromLocalStorage("accessToken");
  if (token === null) {
    return <Navigate to={"/login"} />;
  }
  if (allowedUserType.includes(userType)) {
    return children;
  }
};
