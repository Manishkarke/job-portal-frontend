import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../../Components/Button";
import { Navigation } from "../../../Components/Navigations/User/Navigation";
import { getJobs } from "../../../Redux/Feature/user/Jobs/jobAction";
import { UserLayout } from "../../../Layouts/UserLayout";

export const JobList = () => {
  const jobs = useSelector((state) => state.jobs.jobs);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getJobs());
    console.log(jobs);
  }, []);
  return <h1> Hello this is job list page </h1>;
};
