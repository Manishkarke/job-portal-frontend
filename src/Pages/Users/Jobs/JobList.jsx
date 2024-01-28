import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getJobs } from "../../../Redux/Feature/user/Jobs/jobAction";
import { UserLayout } from "../../../Layouts/UserLayout";
import { Banner } from "../../../Components/Banner";

export const JobList = () => {
  const jobs = useSelector((state) => state.jobs.jobs);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getJobs());
  }, []);
  return (
    <>
      <Banner moto={"where you can find your dream jobs"} />
    </>
  );
};
