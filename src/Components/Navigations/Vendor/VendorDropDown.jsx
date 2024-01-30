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
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <ul className={tailwindClass.container}>
      <li className="mb-2 font-medium">
        <h3>
          hello
          <span className="flex justify-center text-indigo-950 font-extrabold text-lg">
            {user.name}
          </span>
        </h3>
        {/* <NavLink to="/vendor/profile" className={tailwindClass.links}>
          profile
        </NavLink> */}
      </li>

      <li>
        <Button type="button" onClick={handleLogout} customization="w-full">
          log out
        </Button>
      </li>
    </ul>
  );
};
