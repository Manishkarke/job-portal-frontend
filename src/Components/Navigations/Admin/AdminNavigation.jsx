import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../../Redux/Feature/user/Auth/authSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Button } from "../../Button";
logout;

const tailwindClass = {
  flex: "flex justify-center items-center",
  logo: "font-semibold text-lg pt-4 text-center",
  navItems: "flex-col h-full",
  fullWidth: "w-full",
  navItem: "py-2 px-10 border-b border-solid",
  button:
    "px-4 py-2 text-white	 flex justify-center rounded-xl bg-violet-400 rounded-sm transition-all ",
};
export const AdminNavigation = ({ className }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className={`${className} ${tailwindClass.flex}`}>
      <h1 className={`${tailwindClass.logo} ${tailwindClass.fullWidth}`}>
        Job-<span className="text-orange-400">portal</span>
      </h1>
      <ul
        className={`${tailwindClass.navItems} ${tailwindClass.fullWidth} ${tailwindClass.flex}`}
      >
        <li className={`${tailwindClass.fullWidth} mt-auto`}>
          <NavLink
            end
            className={`${tailwindClass.flex} ${tailwindClass.navItem}`}
            to="/admin"
          >
            home
          </NavLink>
        </li>
        <li className={tailwindClass.fullWidth}>
          <NavLink
            end
            className={`${tailwindClass.flex} ${tailwindClass.navItem}`}
            to="/admin/category/"
          >
            categories
          </NavLink>
        </li>
        <li className={tailwindClass.fullWidth}>
          <NavLink
            className={`${tailwindClass.flex} ${tailwindClass.navItem}`}
            to={"/admin/vendors/"}
          >
            vendors
          </NavLink>
        </li>
        <li className={`${tailwindClass.fullWidth} mt-auto`}>
          <Button type="button" customization="w-full" onClick={logoutHandler}>
            log out
          </Button>
        </li>
      </ul>
    </nav>
  );
};
