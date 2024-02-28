import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getJobs } from "../../../Redux/Feature/user/userAction";
import { Banner } from "../../../Components/Banner";
import { JobCard } from "../../../Components/Cards/JobCard";

export const JobList = () => {
  const jobs = useSelector((state) => state.user.jobs);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getJobs());
  }, []);
  console.log(jobs);
  return (
    <>
      <Banner
        moto={"where you can find your dream jobs"}
        buttonText="find jobs"
        buttonLink="/"
        sectionId="section4"
      />

      <section>
        {jobs ? (
          jobs.map((job) => <JobCard key={job._id} {...job} />)
        ) : (
          <span>No jobs available</span>
        )}
      </section>
      <section
        id="section1"
        className="h-screen text-9xl grid place-content-center bg-orange-200"
      >
        section1
      </section>
      <section
        id="section2"
        className="h-screen text-9xl grid place-content-center bg-orange-300"
      >
        section2
      </section>
      <section
        id="section3"
        className="h-screen text-9xl grid place-content-center bg-orange-400"
      >
        section3
      </section>
      <section
        id="section4"
        className="h-screen text-9xl grid place-content-center bg-orange-500"
      >
        section4
      </section>
    </>
  );
};
