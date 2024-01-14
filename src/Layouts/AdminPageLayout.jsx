import React from "react";
import { AdminNavigation } from "../Components/Navigations/Admin/AdminNavigation";

export const AdminPageLayout = ({ children }) => {
  return (
    <main className="page-layout">
      <AdminNavigation className="navigation admin" />

      <section className="page-content">{children}</section>
    </main>
  );
};
