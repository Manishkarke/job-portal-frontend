import React from "react";

export const Button = ({ type, children, sizeClass, colorClass, onClick }) => {
  return (
    <Button
      type={type}
      className={`${sizeClass} ${colorClass}`}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};
