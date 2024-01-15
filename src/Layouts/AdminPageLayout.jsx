import React from "react";
import { AdminNavigation } from "../Components/Navigations/Admin/AdminNavigation";

export const AdminPageLayout = ({ children }) => {
  return (
    <main className="grid grid-cols-2 mt-8">
      <AdminNavigation />

      <section className="fixed left-52 container border border-solid mx-auto">
        {children}
      </section>
    </main>
  );
};
