import React from "react";

export const Banner = ({ moto }) => {
  return (
    <div className="py-8 grid place-content-center shadow-lg">
      <h1 className="text-7xl font-serif font-bold text-center capitalize">
        Welcome to job-<span className="text-orange-400">portal</span>
        <p className="text-2xl lowercase mt-3 font-sans">{moto}</p>
      </h1>
    </div>
  );
};
