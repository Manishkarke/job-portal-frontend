import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Banner } from "../../../Components/Banner";
import { JobCard } from "../../../Components/Cards/JobCard";
import { getJobs } from "../../../Redux/Feature/user/userAction";

export const JobList = () => {
  const jobs = useSelector((state) => state.user.jobs);
  const dispatch = useDispatch();
  useEffect(() => {
    const source = axios.CancelToken.source();
    dispatch(getJobs(source.token));
    return () => {
      source.cancel("Job request canceled");
    };
  }, []);

  return (
    <>
      <Banner
        moto={"where you can find your dream jobs"}
        buttonText="find jobs"
        buttonLink="/"
        sectionId="jobs"
      />

      <section id="jobs" className="py-4 grid">
        {jobs ? (
          jobs.map((job) => <JobCard key={job._id} {...job} />)
        ) : (
          <span>No jobs available</span>
        )}
      </section>
    </>
  );
};
