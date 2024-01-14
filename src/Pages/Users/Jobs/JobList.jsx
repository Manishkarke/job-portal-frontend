import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../../Components/Button";
import { Navigation } from "../../../Components/Navigations/User/Navigation";
import { getJobs } from "../../../Redux/Feature/user/Jobs/jobAction";

export const JobList = () => {
  const jobs = useSelector((state) => state.jobs.jobs);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getJobs());
    console.log(jobs);
  }, []);
  return (
    <>
      <Navigation />
      <div>
        <Button type={"button"} />
        <ul className="grid">
          {jobs.map((job) => {
            return <h2>{job.title}</h2>;
          })}
        </ul>
      </div>
    </>
  );
};
