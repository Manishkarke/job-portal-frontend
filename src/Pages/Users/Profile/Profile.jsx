import React from "react";
import { useSelector } from "react-redux";
import { UserLayout } from "../../../Layouts/UserLayout";

export const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  return <UserLayout>Profile Page</UserLayout>;
};
