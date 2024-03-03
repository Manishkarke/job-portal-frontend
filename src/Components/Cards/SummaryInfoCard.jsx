import React from "react";

const SummaryInfoCard = ({ iconClass, title, children }) => {
  return (
    <li className=" flex items-center gap-2 shadow-lg w-56 pr-4 rounded-md">
      <div className="text-2xl p-6 bg-orange-100 text-orange-600 rounded-md">
        <i className={iconClass}></i>
      </div>
      <div>
        <h4 className="text-sm capitalize font-semibold text-gray-500">
          {title}
        </h4>
        <p className="text-sm capitalize">{children}</p>
      </div>
    </li>
  );
};

export default SummaryInfoCard;
