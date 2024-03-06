import React from "react";
import { useNavigate } from "react-router-dom";
const buttonClass =
  "flex justify-center capitalize rounded-md bg-orange-600 px-3 py-1.5 text-md font-semibold leading-6 hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600";
export const Button = ({
  type,
  children,
  navigateTo,
  sectionId,
  onClick,
  customization,
  color,
  background,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (sectionId) {
      // Scroll to the section with the given ID
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // If no sectionId provided, navigate as usual
      navigate(navigateTo);
    }
  };

  if (type === "submit")
    return (
      <button
        type={type}
        className={`${customization} ${buttonClass} ${color || "text-white"} ${
          background || "bg-orange-600"
        }`}
      >
        {children}
      </button>
    );
  if (type === "button" && onClick)
    return (
      <button
        type={type}
        className={`${buttonClass} ${customization} ${color || "text-white"} ${
          background || "bg-orange-600"
        }`}
        onClick={() => onClick()}
      >
        {children}
      </button>
    );
  else
    return (
      <button
        type={type}
        className={`${buttonClass} ${customization} ${color || "text-white"} ${
          background || "bg-orange-600"
        }`}
        onClick={handleClick}
      >
        {children}
      </button>
    );
};
