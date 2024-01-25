import React, { useEffect } from "react";

export const AdminDashboard = () => {
  useEffect(() => {
    console.log("I am being mounted");
    return () => {
      console.log(" I am being unmounted");
    };
  }, []);
  return (
    <>
      <div>Admin Dashboard</div>
    </>
  );
};
