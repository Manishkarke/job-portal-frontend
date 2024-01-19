import React from "react";

export const VendorsTableHeader = () => {
  const tailwindClass = {
    tableHeader: "border-b-2 pt-2 sticky top-16 rounded-md shadow-md bg-white",
    tableHeaderItem: " py-3",
  };
  return (
    <thead className={`${tailwindClass.tableHeader}`}>
      <tr>
        <th className={`${tailwindClass.tableHeaderItem}`}>name</th>
        <th className={`${tailwindClass.tableHeaderItem}`}>email</th>
        <th className={`${tailwindClass.tableHeaderItem}`}>service</th>
        <th className={`${tailwindClass.tableHeaderItem}`}>contact</th>
        <th className={`${tailwindClass.tableHeaderItem}`}>address</th>
        <th className={`${tailwindClass.tableHeaderItem}`}>actions</th>
      </tr>
    </thead>
  );
};
