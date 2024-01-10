import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { getDataFromLocalStorage } from "../utils/localStorage";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";

export default function Router() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Dashboard />} />
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
