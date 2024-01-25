import React from "react";
import { AdminNavigation } from "../Components/Navigations/Admin/AdminNavigation";

export const AdminPageLayout = ({ children }) => {
  const tailwindCLass = {
    sidebar:
      "fixed top-0 h-5/6 w-52 flex-col top-0 left-0 shadow-lg capitalize rounded-b-xl",
    content:
      "fixed top-0 left-52 w-full overflow-x-scroll overflow-y-scroll h-full container  mx-auto",
  };
  return (
    <>
      <main className="grid grid-cols-2 mt-4 relative">
        <AdminNavigation className={tailwindCLass.sidebar} />
        <section id="content" className={tailwindCLass.content}>
          <p className="text-center text-white bg-gray-500 py-3 font-semibold">Job portal admin dashboard</p>
          {children}
        </section>
      </main>
    </>
  );
};
