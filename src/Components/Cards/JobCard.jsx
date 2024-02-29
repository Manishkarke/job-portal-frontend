import React from "react";
import { Button } from "../Button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const JobCard = ({
  _id,
  category,
  title,
  postedBy,
  location,
  salary,
  deadline,
}) => {
  const today = new Date();
  const deadlineTime = new Date(deadline);

  const timeDef = deadlineTime - today;
  let remainingTime = Math.ceil(timeDef / (1000 * 60 * 24 * 60));

  return (
    <article className="max-w-fit px-4 py-2 shadow-lg rounded-lg border border-solid grid gap-3">
      <div className="capitalize font-bold flex gap-4">
        <div>
          <img className="w w-14 rounded-md" src={postedBy.image} alt="" />
        </div>
        <div>
          <h3 className="text-lg">{title}</h3>
          <p className="text-sm text-slate-600">by {postedBy.name}</p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="capitalize text-sm font-semibold flex px-1 py-1 bg-slate-400 w-fit rounded-md">
          #{category.category}
        </span>
        <p className="max-w-80 line-clamp-2">
          <i className="fa-solid fa-location-dot"></i> {location}
        </p>
        <div className="flex justify-between">
          <p className="font font-medium">
            <i className="fa-solid fa-dollar-sign"></i> {salary}
          </p>
          <p className="font font-medium">
            <i className="fa-solid fa-clock"></i> {remainingTime} days left
          </p>
        </div>
      </div>

      <Button type="button" navigateTo={`jobs/${_id}`}>
        view details
      </Button>
    </article>
  );
};
