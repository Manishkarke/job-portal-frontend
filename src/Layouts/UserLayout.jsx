import React from "react";
import { Navigation } from "../Components/Navigations/User/Navigation";
import { Outlet } from "react-router-dom";

export const UserLayout = ({ children }) => {
  const tailwindClass = {
    mainContainer: "grid w-full max-w-screen-2xl mx-auto relative font-sans",
    navigation:
      "flex justify-center items-center capitalize p-4 shadow-xl mb-8 max-w-screen-2xl fixed w-full top-0 rounded-lg z-10 bg-white",
    contentSection: "border border-solid  pt-4",
  };

  return (
    <main className={tailwindClass.mainContainer}>
      <Navigation className={tailwindClass.navigation} />
      <section className={`${tailwindClass.contentSection} user-content-container`}>
        <Outlet />
      </section>
    </main>
  );
};
