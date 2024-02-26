import React from "react";
import { Button } from "../../../Components/Button";
import { useDispatch, useSelector } from "react-redux";
import { myJobs } from "../../../Redux/Feature/Vendor/vendorAction";
import VendorJobCard from "../../../Components/Cards/VendorJobCard";

export const PostedJobList = () => {
  const jobs = useSelector((state) => state.vendor.postedJobs);
  const error = useSelector((state) => state.vendor.error);
  const dispatch = useDispatch();

  // Effect
  React.useEffect(() => {
    dispatch(myJobs());
    console.log(jobs);
  }, []);
  console.log(error);
  return (
    <>
      <section className="py-4">
        <div className="flex justify-between items-center px-4">
          <h2 className="text-xl capitalize font-bold">my jobs</h2>
          <Button customization="w-fit" navigateTo="/vendor/createJobs">
            create jobs
          </Button>
        </div>

        {/* Job cards */}
        <section className="py-4 grid gap-4 justify-center justify-items-center md:grid-cols-2 lg:grid-cols-3">
          {jobs.length !== 0
            ? jobs.map((job) => <VendorJobCard key={job._id} {...job} />)
            : error}
        </section>
      </section>
    </>
  );
};
