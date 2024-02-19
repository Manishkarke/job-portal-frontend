import React from "react";
import { Button } from "../Button";
import { useDispatch } from "react-redux";
import { deleteJob } from "../../Redux/Feature/Vendor/vendorAction";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const VendorJobCard = ({
  _id,
  category,
  title,
  description,
  location,
  salary,
  deadline,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const today = new Date();
  const deadlineTime = new Date(deadline);

  const timeDef = deadlineTime - today;
  let remainingTime = Math.ceil(timeDef / (1000 * 60 * 24 * 60));

  const deleteJobHanlder = () => {
    dispatch(deleteJob({ id: _id, toast, navigate }));
  };
  return (
    <article className="max-w-fit px-4 py-2 shadow-lg rounded-lg border border-solid grid gap-3">
      <div className="capitalize font-bold">
        <h3 className="text-lg">{title}</h3>
        <p className="text-sm text-slate-600">{category.category}</p>
      </div>
      <p className="max-w-80 line-clamp-2">{description}</p>
      <div className="flex justify-between">
        <p className="font font-medium">
          <i className="fa-solid fa-dollar-sign"></i> {salary}
        </p>
        <p className="font font-medium">
          <i className="fa-solid fa-clock"></i> {remainingTime} days left
        </p>
      </div>

      <div className="flex justify-between ">
        <Button
          type="button"
          onClick={deleteJobHanlder}
          customization="bg-transparent hover:bg-green-600 hover:text-white border-2 border-solid text-current"
        >
          delete job
        </Button>
        <Button type="button" navigateTo={`${_id}`}>
          view details
        </Button>
      </div>
    </article>
  );
};

export default VendorJobCard;
