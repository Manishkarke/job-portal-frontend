import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AdminPageLayout } from "../Layouts/AdminPageLayout";
import { ProfilePageLayout } from "../Layouts/ProfilePageLayout";
import { UserLayout } from "../Layouts/UserLayout";
import { AdminCategory } from "../Pages/Admin/Category/AdminCategory";
import { AdminDashboard } from "../Pages/Admin/Dashboard/AdminDashboard";
import { VendorList } from "../Pages/Admin/VendorList/VendorList";
import { VendorRequests } from "../Pages/Admin/VendorList/VendorRequests";
import Login from "../Pages/Common/Login/Login";
import Register from "../Pages/Common/Register/Register";
import { JobList } from "../Pages/Users/Jobs/JobList";
import { AppliedJobs } from "../Pages/Users/Profile/AppliedJobs";
import { Profile } from "../Pages/Users/Profile/Profile";
import { VendorRegister } from "../Pages/Users/Profile/VendorRegister";
import { VendorDashboard } from "../Pages/Vendor/Dashboard/VendorDashboard";
import { getDataFromLocalStorage } from "../utils/localStorage";
import { VendorList } from "../Pages/Admin/VendorList/VendorList";
import { VendorRequests } from "../Pages/Admin/VendorList/VendorRequests";

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
        <Route path="/" element={<JobList />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute userType={userType} allowedUserType="user">
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="/jobs" element={<JobList />} />
        {/* User Routes */}
        {/* User Routes */}
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
            <Route
              path="appliedJobs"
              element={
                <ProtectedRoute userType={userType} allowedUserType="user">
                  <AppliedJobs />
                </ProtectedRoute>
              }
            />

            <Route
              path="registerAsVendor"
              element={
                <ProtectedRoute userType={userType} allowedUserType="user">
                  <VendorRegister />
                </ProtectedRoute>
              }
            />
          </Route>
        </Route>

        {/* Vendor ROutes */}
        {/* Vendor ROutes */}
        {/* Vendor ROutes */}

        <Route path="/vendor" element={<VendorPageLayout />}>
          <Route
            index={true}
            element={
              <ProtectedRoute userType={userType} allowedUserType="vendor">
                <VendorDashboard />
              </ProtectedRoute>
            }
          />
        </Route>
        {/* Admin ROutes */}
        {/* Admin ROutes */}
        {/* Admin ROutes */}
        <Route path="/admin" element={<AdminPageLayout />}>
          <Route
            index={true}
            element={
              <ProtectedRoute userType={userType} allowedUserType="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="category"
            element={
              <ProtectedRoute userType={userType} allowedUserType="admin">
                <AdminCategory />
              </ProtectedRoute>
            }
          />
          <Route
            path="vendors"
            element={
              <ProtectedRoute userType={userType} allowedUserType="admin">
                <VendorList />
              </ProtectedRoute>
            }
          />

          <Route
            path="vendors/requests"
            element={
              <ProtectedRoute userType={userType} allowedUserType="admin">
                <VendorRequests />
              </ProtectedRoute>
            }
          />
        </Route>
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
