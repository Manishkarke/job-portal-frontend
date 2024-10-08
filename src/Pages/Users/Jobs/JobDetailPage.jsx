import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleJob } from "../../../Redux/Feature/user/userAction";
import { Button } from "../../../Components/Button";
import SummaryInfoCard from "../../../Components/Cards/SummaryInfoCard";

const JobDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { singleJob, isLoading } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(getSingleJob(id));
  }, []);

  return (
    <div>
      {isLoading ? (
        "Loading..."
      ) : (
        <>
          <section className="grid gap-2">
            {/* job detail header  */}
            <div className="flex gap-3 justify-center items-center py-4 border-b border-solid">
              <div className="max-w-28 rounded-full overflow-hidden">
                <img
                  src={singleJob?.postedBy?.image}
                  alt={singleJob?.postedBy?.name}
                />
              </div>
              <div className="justify-self-start">
                <h3>{singleJob?.title}</h3>
                <h3 className="uppercase text-orange-600 font-medium">
                  {singleJob.postedBy?.name}
                </h3>
                <p className="font-small">
                  <i className="fa-solid fa-location-dot pr-1"></i>
                  {singleJob?.location}
                </p>
              </div>
            </div>

            {/* Job info more */}
            <ul className="flex py-4 gap-4 flex-wrap justify-center border-b border-solid">
              <SummaryInfoCard
                iconClass="fa-solid fa-dollar-sign"
                title="offered salary"
              >
                {singleJob?.salary}
                <span className="text-sm capitalize"> /month </span>
              </SummaryInfoCard>

              <SummaryInfoCard
                iconClass="fa-solid fa-location-dot"
                title="location"
              >
                onsite
              </SummaryInfoCard>

              <SummaryInfoCard
                iconClass="fa-solid fa-chart-simple"
                title="level"
              >
                entry
              </SummaryInfoCard>

              <SummaryInfoCard
                iconClass="fa-solid fa-user-group"
                title="opening"
              >
                1
              </SummaryInfoCard>
            </ul>
          </section>
          {/* About Company */}
          <article className="capitalize">
            <h2 className="font-bold text-lg">about company </h2>

            <div>
              <h3 className="text-orange-600 font-medium">
                {singleJob.postedBy?.name}
              </h3>
              <p>location: {singleJob?.location}</p>
            </div>
          </article>
        </>
      )}
    </div>
  );
};

export default JobDetail;
