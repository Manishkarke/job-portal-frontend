import React from "react";
import { NavLink } from "react-router-dom";

export const RegisterPageLayout = ({ children }) => {
  return (
    <section className="size-full border border-solid h-full grid place-content-center relative">
      <NavLink
        to={"/"}
        className="capitalize shadow-xl border border-solid rounded-xl py-2 px-4 absolute top-4 left-4 text-xl font-semibold"
      >
        home
      </NavLink>

      {children}
    </section>
  );
};
