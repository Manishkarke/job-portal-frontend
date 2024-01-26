import React from "react";
import { useSelector } from "react-redux";

export const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  return <>This is user profile page I am changing something here</>;
};
