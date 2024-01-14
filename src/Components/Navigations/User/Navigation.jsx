import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { fetchProfile } from "../../../Redux/Feature/user/Auth/authAction";
import { DropdownMenu } from "./DropdownMenu";
import { getDataFromLocalStorage } from "../../../utils/localStorage";

export const Navigation = () => {
  // States
  const [showDropdown, setShowDropdown] = useState(false);
  const user = useSelector((state) => state.auth.user);

  // Fetching userdata
  const dispatch = useDispatch();
  useEffect(() => {
    const token = getDataFromLocalStorage("accessToken");
    if (token) {
      dispatch(fetchProfile());
    }
  }, []);

  // Tailwind css class
  const tailwindClass = {
    link: "px-4 py-2 border border-solid",
    avatar: "w-14 rounded-full cursor-pointer",
  };

  const handleAvatarClick = () => {
    setShowDropdown(!showDropdown);
  };
  return (
    <nav className="flex justify-center items-center capitalize mb-8">
      {/* Logo */}
      <h1 className="font-semibold text-lg">
        Job-<span className="text-orange-400">portal</span>
      </h1>

      {/* Nav Items */}
      <ul className="flex ml-auto items-center gap-2 basis-6/12">
        <li className="">
          <NavLink className={tailwindClass.link} to={"/"}>
            home
          </NavLink>
        </li>
        <li>
          <NavLink className={tailwindClass.link} to={"#"}>
            category
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
            <NavLink className={tailwindClass.link} to={"/login"}>
              log in
            </NavLink>
          )}
        </li>
      </ul>
    </nav>
  );
};
