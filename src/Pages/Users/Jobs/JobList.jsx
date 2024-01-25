import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getJobs } from "../../../Redux/Feature/user/Jobs/jobAction";
import { UserLayout } from "../../../Layouts/UserLayout";

export const JobList = () => {
  const jobs = useSelector((state) => state.jobs.jobs);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getJobs());
    console.log(jobs);
  }, []);
  return <UserLayout>Job List page</UserLayout>;
};
