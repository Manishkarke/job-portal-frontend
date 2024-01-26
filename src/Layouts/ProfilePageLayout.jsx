import React from "react";
import { Outlet } from "react-router-dom";
import { ProfileNavigation } from "../Components/Navigations/User/ProfileNavigation";

export const ProfilePageLayout = () => {
  return (
    <>
      <ProfileNavigation />
      <>
        <Outlet />
      </>
    </>
  );
};
