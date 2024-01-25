import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AdminCategory } from "../Pages/Admin/Category/AdminCategory";
import { AdminDashboard } from "../Pages/Admin/Dashboard/AdminDashboard";
import Login from "../Pages/Common/Login/Login";
import Register from "../Pages/Common/Register/Register";
import { JobList } from "../Pages/Users/Jobs/JobList";
import { Profile } from "../Pages/Users/Profile/Profile";
import { VendorDashboard } from "../Pages/Vendor/Dashboard/VendorDashboard";
import Login from "../Pages/Common/Login/Login";
import Register from "../Pages/Common/Register/Register";
import { AdminCategory } from "../Pages/Admin/Category/AdminCategory";

export default function Router() {
  const [userType, setUserType] = useState("");
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
        <Route
          path="/admin/vendors/"
          element={
            <ProtectedRoute userType={userType} allowedUserType="admin">
              <VendorList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/vendors/requests/"
          element={
            <ProtectedRoute userType={userType} allowedUserType="admin">
              <VendorRequests />
            </ProtectedRoute>
          }
        />
        {/* Common Routes  */}
        {/* Common Routes  */}
        {/* Common Routes  */}
        <Route
          path="/login"
          element={
            <RestrictFromFormComponent>
              <Login />
            </RestrictFromFormComponent>
          }
        />
        <Route
          path="/register"
          element={
            <RestrictFromFormComponent>
              <Register />
            </RestrictFromFormComponent>
          }
        />
      </Routes>
    </>
  );
}

const ProtectedRoute = ({ children, allowedUserType, userType }) => {
  const token = getDataFromLocalStorage("accessToken");
  if (token === null) {
    return <Navigate to={"/login"} />;
  }
  if (allowedUserType === userType) {
    return children;
  }
};

const RestrictFromFormComponent = ({ children }) => {
  const token = getDataFromLocalStorage("accessToken");
  const role = getDataFromLocalStorage("role");

  if (!token) {
    return children;
  } else if (token && role === "admin") {
    return <Navigate to={"/admin"} />;
  } else if (token && role === "vendor") {
    return <Navigate to={"/vendor"} />;
  } else if (token && role === "user") {
    return <Navigate to={"/"} />;
  }
};
