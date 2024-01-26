import React from "react";
import { Link } from "react-router-dom";

export const PageNotFound = () => {
  return (
    <section>
      <h1>page not found</h1>
      <Link to="/">Back to home</Link>
    </section>
  );
};
