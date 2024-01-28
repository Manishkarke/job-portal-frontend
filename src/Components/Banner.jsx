import React from "react";

export const Banner = ({ moto, buttonText, buttonLink }) => {
  return (
    <div className="py-8 grid place-content-center gap-4 shadow-lg h-full capitalize">
      <h1 className="text-7xl font-serif font-bold text-center ">
        Welcome to job-<span className="text-orange-400">portal</span>
        <p className="text-2xl lowercase font-sans">{moto}</p>
      </h1>
      <button
        type="button"
        className="w-fit py-2 px-4 justify-self-center text-white bg-orange-400 rounded-lg text-lg capitalize font-semibold"
      >
        {buttonText}
      </button>
    </div>
  );
};
