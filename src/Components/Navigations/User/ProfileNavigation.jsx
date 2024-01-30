import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const tailwindClass = {
  navContainer:
    "flex justify-center gap-4 text-white font-semibold capitalize border-b border-solid py-2",
  navLink: `flex py-2 text-black px-4 border-r-2 border-solid`,
};

export const ProfileNavigation = () => {
  return (
    <>
      <aside>
        <ul className={tailwindClass.navContainer}>
          <li>
            <NavLink className={tailwindClass.navLink} to={"profile"}>
              profile
            </NavLink>
          </li>
          <li>
            <NavLink
              end
              className={tailwindClass.navLink}
              to={"appliedJobs"}
            >
              applied jobs
            </NavLink>
          </li>
          <li>
            <NavLink
              className={tailwindClass.navLink}
              to={"registerAsVendor"}
            >
              vendor register
            </NavLink>
          </li>
        </ul>
      </aside>

      <Outlet />
    </>
  );
};
