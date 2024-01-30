import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getDataFromLocalStorage } from "../../../utils/localStorage";
import { VendorDropdownMenu } from "./VendorDropDown";

// Tailwind css class
const tailwindClass = {
  link: "px-4 py-2 border-solid font-medium hover:bg-orange-400 hover:text-white transition-all",
  avatar: "w-14 rounded-full cursor-pointer object-cover shadow-md",
  button:
    "px-4 py-2 flex justify-center w-full text-white font-semibold bg-orange-400 rounded-sm transition-all",
};

function VendorNavigation({ className }) {
  // States
  const [showDropdown, setShowDropdown] = React.useState(false);
  const user = JSON.parse(getDataFromLocalStorage("user"));

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
        <li>
          <NavLink end className={`${tailwindClass.link} border-r-2`} to="">
            home
          </NavLink>
        </li>

        <li>
          <NavLink
            className={`${tailwindClass.link} border-r-0`}
            to={"applicants"}
          >
            applicants
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

              {showDropdown && <VendorDropdownMenu user={user} />}
            </div>
          ) : (
            <Button type="button" fullWidth={false} navigateTo={"/login"}>
              log in
            </Button>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default VendorNavigation;
