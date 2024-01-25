import React from "react";
import { Outlet } from "react-router-dom";

export const VendorPageLayout = () => {
  return (
    <div>
      Here goes our vendor Navigation
      <Outlet />
    </div>
  );
};
