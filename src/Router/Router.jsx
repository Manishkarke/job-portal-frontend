import React from "react";
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
import { VendorPageLayout } from "../Layouts/VendorPageLayout";
import { PageNotFound } from "../Pages/Common/PageNotFound";
import { ProfileNavigation } from "../Components/Navigations/User/ProfileNavigation";
import { PostedJobList } from "../Pages/Vendor/Jobs/PostedJobList";
import { CreateJob } from "../Pages/Vendor/Jobs/CreateJob";
import { ApplicantLists } from "../Pages/Vendor/Applicants/ApplicantLists";
import { ApplicantDetail } from "../Pages/Vendor/Applicants/ApplicantDetail";
import { JobDetailPage } from "../Pages/Vendor/Jobs/JobDetailPage";
import { VendorDashboard } from "../Pages/Vendor/Profile/VendorDashboard";
import { ConfirmEmail } from "../Pages/Common/Password reset/ConfirmEmail";
import { PasswordReset } from "../Pages/Common/Password reset/PasswordReset";
import { OtpVerificationForm } from "../Pages/Common/Verification/OtpVerificationForm";
import JobDetail from "../Pages/Users/Jobs/JobDetailPage";

import { toast } from "react-toastify";
import { api } from "../utils/axios";
import {
  getDataFromLocalStorage,
  removeDataFromLocalStorage,
  setDataInLocalStorage,
} from "../utils/localStorage";

export default function Router() {
  const navigate = useNavigate();
  // Axios middleware for response
  api.interceptors.response.use(
    async (response) => {
      // check if the we get token expired message and if so then call the generate new accesstoken api endpoint
      if (response.data.message === "The access token is expired") {
        const newAccessTokenResponse = await api.post(
          "/auth/generateAccessToken"
        );
        // if the new access token is generated then store it in the local storage and change the token in header
        if (newAccessTokenResponse.data.status === "success") {
          setDataInLocalStorage(
            "accessToken",
            newAccessTokenResponse.data.data
          );

          const originalRequest = response.config;
          originalRequest.headers.Authorization =
            "Bearer " + newAccessTokenResponse.data.data;
          return api(originalRequest);

          // if the new access token failed then remove the existing tokens from local storage and send user to sign in page
        } else if (newAccessTokenResponse.data.status === "error") {
          if (
            newAccessTokenResponse.data.message === "Refresh Token not found"
          ) {
            removeDataFromLocalStorage("accessToken");
            removeDataFromLocalStorage("role");
            removeDataFromLocalStorage("user");
            toast.error(newAccessTokenResponse.data.message);
            navigate("/login");
          }
        }
      } else {
        return response;
      }
    },
    (error) => {
      console.log(error);
    }
  );

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
        <Route path="jobs/:id" element={<JobDetail />} />
        <Route path="user" element={<ProfileNavigation />}>
          <Route path="profile" element={<Profile />} />
          <Route path="appliedJobs" element={<AppliedJobs />} />
          <Route path="registerAsVendor" element={<VendorRegister />} />
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
        <Route index element={<VendorDashboard />} />
        <Route path="jobs" element={<PostedJobList />} />
        <Route path="jobs/:id" element={<JobDetailPage />} />
        <Route path="applicants" element={<ApplicantLists />} />
        <Route path="applicants/:id" element={<ApplicantDetail />} />
        <Route path="createJobs" element={<CreateJob />} />
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
        <Route index element={<AdminDashboard />} />
        <Route path="category" element={<AdminCategory />} />
        <Route path="vendors" element={<VendorList />} />
        <Route path="vendors/requests" element={<VendorRequests />} />
      </Route>

      {/* Common Routes */}
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
      <Route
        path="/verify-otp"
        element={
          <RestrictFromFormComponent>
            <OtpVerificationForm />
          </RestrictFromFormComponent>
        }
      />
      <Route
        path="/confirm-email"
        element={
          <RestrictFromFormComponent>
            <ConfirmEmail />
          </RestrictFromFormComponent>
        }
      />

      <Route
        path="/reset-password"
        element={
          <RestrictFromFormComponent>
            <PasswordReset />
          </RestrictFromFormComponent>
        }
      />

      {/* Page not found route */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

const RestrictFromFormComponent = ({ children }) => {
  const token = getDataFromLocalStorage("accessToken");

  if (token !== null) {
    return <Navigate to="/" />;
  }
  return !token && children;
};
const AuthWraper = ({ children }) => {
  const token = localStorage.getItem("accessToken");

  if (token === null) {
    return <Navigate to={"/login"} />;
  }
  return token && children;
};
