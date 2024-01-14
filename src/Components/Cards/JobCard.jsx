import React from "react";

export const JobCard = ({ postedBy, title }) => {
  return (
    <article>
      <div>
        <div>
          <img src={image} alt={title} />
        </div>
        <div className="company-details">
          <h3 className="company-name"></h3>
        </div>
      </div>

      <div className="details">
        <p></p>
      </div>
    </article>
  );
};
