import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleJob } from "../../../Redux/Feature/user/userAction";

const JobDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { singleJob, isLoading } = useSelector((state) => state.user);
  const cancelToken = axios.CancelToken.source();
  useEffect(() => {
    dispatch(getSingleJob(id, cancelToken.token));
    return () => {
      cancelToken.cancel();
    };
  }, []);

  return (
    <div>
      {isLoading ? (
        "Loading..."
      ) : (
        <section>{JSON.stringify(singleJob)}</section>
      )}
    </div>
  );
};

export default JobDetail;
