import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { AdminPageLayout } from "../Layouts/AdminPageLayout";
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
import { VendorPageLayout } from "../Layouts/VendorPageLayout";
import { PageNotFound } from "../Pages/Common/PageNotFound";
import { ProfileNavigation } from "../Components/Navigations/User/ProfileNavigation";

export default function Router() {
  const userType = getDataFromLocalStorage("role");
  useEffect(() => {
    // const storedUserType = getDataFromLocalStorage("role");
    // if (storedUserType) {
    //   setUserType(storedUserType);
    // }
  }, []);
  return (
    <Routes>
      {/* User Routes */}
      <Route
        path="/"
        element={
          <AuthWraper>
            <UserLayout />
          </AuthWraper>
        }
      >
        <Route index element={<JobList />} />
        <Route path="user" element={<ProfileNavigation />}>
          <Route
            path="profile"
            element={
              // <ProtectedRoute userType={userType} allowedUserType="user">
              <Profile />
              // </ProtectedRoute>
            }
          />
          <Route
            path="appliedJobs"
            element={
              // <ProtectedRoute userType={userType} allowedUserType="user">
              <AppliedJobs />
              // </ProtectedRoute>
            }
          />
          <Route
            path="registerAsVendor"
            element={
              // <ProtectedRoute userType={userType} allowedUserType="user">
              <VendorRegister />
              // </ProtectedRoute>
            }
          />
        </Route>
      </Route>

      {/* Vendor Routes */}
      <Route
        path="/vendor"
        element={
          <AuthWraper>
            <VendorPageLayout />
          </AuthWraper>
        }
      >
        <Route
          index
          element={
            // <ProtectedRoute userType={userType} allowedUserType="vendor">
            <VendorDashboard />
            // </ProtectedRoute>
          }
        />
      </Route>

      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          <AuthWraper>
            <AdminPageLayout />
          </AuthWraper>
        }
      >
        <Route
          index
          element={
            // <ProtectedRoute userType={userType} allowedUserType="admin">
            <AdminDashboard />
            // </ProtectedRoute>
          }
        />
        <Route
          path="category"
          element={
            // <ProtectedRoute userType={userType} allowedUserType="admin">
            <AdminCategory />
            // </ProtectedRoute>
          }
        />
        <Route
          path="vendors"
          element={
            // <ProtectedRoute userType={userType} allowedUserType="admin">
            <VendorList />
            // </ProtectedRoute>
          }
        />
        <Route
          path="vendors/requests"
          element={
            // <ProtectedRoute userType={userType} allowedUserType="admin">
            <VendorRequests />
            // </ProtectedRoute>
          }
        />
      </Route>

      {/* Common Routes */}
      <Route
        path="/login"
        element={
          // <RestrictFromFormComponent>
          <Login />
          // </RestrictFromFormComponent>
        }
      />
      <Route
        path="/register"
        element={
          // <RestrictFromFormComponent>
          <Register />
          // </RestrictFromFormComponent>
        }
      />

      {/* Page not found route */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

// const ProtectedRoute = ({ children, allowedUserType, userType }) => {
//   const token = getDataFromLocalStorage("accessToken");
//   const navigate = useNavigate();

//   if (token === null) {
//     navigate("/login");
//     return null;
//   }

//   if (allowedUserType === userType) {
//     return children;
//   }

//   return null;
// };

// const RestrictFromFormComponent = ({ children }) => {
//   const token = getDataFromLocalStorage("accessToken");
//   const role = getDataFromLocalStorage("role");
//   const navigate = useNavigate();

//   if (!token) {
//     return children;
//   }

//   if (role === "admin") {
//     navigate("/admin");
//   } else if (role === "vendor") {
//     navigate("/vendor");
//   } else if (role === "user") {
//     navigate("/");
//   }

//   return null;
// };
const AuthWraper = ({ children }) => {
  const token = localStorage.getItem("accessToken");

  if (token === null) {
    return <Navigate to={"/login"} />;
  }
  return token && children;
};
