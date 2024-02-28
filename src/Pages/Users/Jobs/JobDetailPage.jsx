import React from "react";
import { useParams } from "react-router-dom";

const JobDetail = () => {
  const { id } = useParams();
  console.log("job detail id: " + id);
  return <div>JobDetailPage</div>;
};

export default JobDetail;
