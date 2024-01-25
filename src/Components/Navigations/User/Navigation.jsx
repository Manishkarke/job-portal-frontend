import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { fetchProfile } from "../../../Redux/Feature/user/Auth/authAction";
import { getDataFromLocalStorage } from "../../../utils/localStorage";
import { DropdownMenu } from "./DropdownMenu";

export const Navigation = ({ className }) => {
  // States
  const [showDropdown, setShowDropdown] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  // Fetching userdata
  const dispatch = useDispatch();
  useEffect(() => {
    const token = getDataFromLocalStorage("accessToken");
    const role = getDataFromLocalStorage("role");
    if (token && role === "user") {
      dispatch(fetchProfile());
    } else if (token && role === "vendor") {
      navigate("/vendor");
    } else if (token && role === "admin") {
      navigate("/admin");
    }
  }, []);

  // Tailwind css class
  const tailwindClass = {
    link: "px-4 py-2 border-solid font-medium hover:bg-orange-200 hover:text-white transition-all",
    avatar: "w-14 rounded-full cursor-pointer object-cover shadow-md",
    button:
      "px-4 py-2 flex justify-center w-full text-white font-semibold bg-violet-400 rounded-sm transition-all",
  };

  const handleAvatarClick = () => {
    setShowDropdown(!showDropdown);
  };
  return (
    <nav className={className}>
      {/* Logo */}
      <h1 className="font-semibold text-lg">
        Job-<span className="text-orange-400">portal</span>
      </h1>

      {/* Nav Items */}
      <ul className="flex ml-auto items-center basis-6/12">
        <li className="">
          <NavLink className={`${tailwindClass.link} border-r-2`} to={"/"}>
            home
          </NavLink>
        </li>
        <li>
          <NavLink className={`${tailwindClass.link} border-r-2`} to={"/jobs"}>
            jobs
          </NavLink>
        </li>
        <li>
          <NavLink
            className={`${tailwindClass.link} border-r-0`}
            to={"/category"}
          >
            link 1
          </NavLink>
        </li>
        <li className="ml-auto">
          {user !== null && getDataFromLocalStorage("accessToken") ? (
            <div
              className={`${tailwindClass.avatar} relative`}
              onClick={handleAvatarClick}
            >
              <img
                src={user.image}
                alt={user.name}
                className={tailwindClass.avatar}
              />

              {showDropdown && <DropdownMenu />}
            </div>
          ) : (
            <NavLink
              className={`${tailwindClass.link} ${tailwindClass.button}`}
              to={"/login"}
            >
              log in
            </NavLink>
          )}
        </li>
      </ul>
    </nav>
  );
};
