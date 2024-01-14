import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../../Redux/Feature/user/Auth/authSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
logout;

const tailwindClass = {
  container:
    "h-5/6 w-52 flex-col fixed top-4 left-0 shadow-lg capitalize rounded-b-xl",
  flex: "flex justify-center items-center",
  logo: "font-semibold text-lg pt-4 text-center",
  navItems: "flex-col h-full",
  fullWidth: "w-full",
  navItem: "py-2 px-10 border-b border-solid",
  button:
    "px-4 py-2 text-white	 flex justify-center rounded-xl bg-violet-400 rounded-sm transition-all ",
};
export const AdminNavigation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const logoutHandler = () => {
    dispatch(logout());
    navigate("/login");
    toast.success("Logged Out Successfully");
  };

  return (
    <nav className={`${tailwindClass.container} ${tailwindClass.flex}`}>
      <h1 className={`${tailwindClass.logo} ${tailwindClass.fullWidth}`}>
        Job-<span className="text-orange-400">portal</span>
      </h1>

      <ul
        className={`${tailwindClass.navItems} ${tailwindClass.fullWidth} ${tailwindClass.flex}`}
      >
        <li className={`${tailwindClass.fullWidth} mt-auto`}>
          <NavLink className={`${tailwindClass.flex} ${tailwindClass.navItem}`}>
            home
          </NavLink>
        </li>
        <li className={tailwindClass.fullWidth}>
          <NavLink className={`${tailwindClass.flex} ${tailwindClass.navItem}`}>
            categories
          </NavLink>
        </li>
        <li className={tailwindClass.fullWidth}>
          <NavLink className={`${tailwindClass.flex} ${tailwindClass.navItem}`}>
            home
          </NavLink>
        </li>
        <li className={`${tailwindClass.fullWidth} mt-auto`}>
          <button
            type="button"
            className={`${tailwindClass.button} ${tailwindClass.fullWidth}`}
            onClick={logoutHandler}
          >
            log out
          </button>
        </li>
      </ul>
    </nav>
  );
};
