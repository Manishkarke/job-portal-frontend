import React from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../../Redux/Feature/user/Auth/authSlice";
import { toast } from "react-toastify";

export const DropdownMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // DropdownMenu tailwind classes
  const tailwindClass = {
    container:
      "absolute top-100 right-0 bg-blue-50 py-4 px-3 w-40 capitalize rounded-lg",
    links: `px-4 py-2 flex justify-center w-full rounded-sm transition-all border-b border-solid border-slate-400 hover:bg-violet-200`,
    button:
      "px-4 py-2 flex justify-center w-full bg-violet-400 rounded-sm transition-all ",
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    toast.success("Logged Out Successfully");
  };

  return (
    <ul className={tailwindClass.container}>
      <li>
        <NavLink to="/user/profile" className={tailwindClass.links}>
          profile
        </NavLink>
      </li>
      <li>
        <NavLink className={tailwindClass.links} to="/user/appliedJobs">
          applied jobs
        </NavLink>
      </li>
      <li>
        <button
          type="button"
          className={tailwindClass.button}
          onClick={handleLogout}
        >
          log out
        </button>
      </li>
    </ul>
  );
};
