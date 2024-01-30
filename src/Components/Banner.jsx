import React from "react";
import { Button } from "./Button";

export const Banner = ({ moto, buttonText, buttonLink, sectionId }) => {
  return (
    <div className="py-8 grid place-content-center gap-4  h-full capitalize">
      <h1 className="text-7xl font-serif font-bold text-center ">
        Welcome to job-<span className="text-orange-400">portal</span>
        <p className="text-2xl lowercase font-sans">{moto}</p>
      </h1>
      <Button
        type="button"
        navigateTo={buttonLink}
        sectionId={sectionId}
        customization="w-fit justify-self-center"
      >
        {buttonText}
      </Button>
    </div>
  );
};
