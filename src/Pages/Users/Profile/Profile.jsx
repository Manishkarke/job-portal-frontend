import React from "react";
import { useSelector } from "react-redux";
import { Navigation } from "../../../Components/Navigations/User/Navigation";
import { Button } from "../../../Components/Button";

export const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  return (
    <>
      <Navigation />
      <div className="image ">
        <img className="w-2/12 rounded-full" src={user.image} alt={user.name} />
        <Button>change photo</Button>
      </div>
    </>
  );
};
