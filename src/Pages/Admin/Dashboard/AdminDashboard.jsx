import React, { useEffect } from "react";
import { AdminPageLayout } from "../../../Layouts/AdminPageLayout";

export const AdminDashboard = () => {
  useEffect(() => {
    console.log("I am being mounted");
    return () => {
      console.log(" I am being unmounted");
    };
  }, []);
  return (
    <AdminPageLayout>
      <div>Admin Dashboard</div>
    </AdminPageLayout>
  );
};
