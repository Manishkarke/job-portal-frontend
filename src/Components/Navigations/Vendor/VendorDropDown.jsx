import React from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../../Redux/Feature/user/Auth/authSlice";
import { Button } from "../../Button";

export const VendorDropdownMenu = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // DropdownMenu tailwind classes
  const tailwindClass = {
    container:
      "absolute top-100 right-0 bg-blue-50 py-4 px-3 w-40 capitalize rounded-lg text-center",
    links: `px-4 py-2 flex justify-center w-full rounded-sm transition-all border-y-2 border-solid mb-2`,
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <ul className={tailwindClass.container}>
      <li className="py-2 font-medium">
        <h3>
          hello <span className="text-indigo-950 font-extrabold text-lg">
            {user.name}
          </span>
        </h3>
      </li>
      <li>
        <NavLink end to="" className={tailwindClass.links}>
          dashboard
        </NavLink>
      </li>

      <li>
        <Button type="button" onClick={handleLogout} customization="w-full">
          log out
        </Button>
      </li>
    </ul>
  );
};
