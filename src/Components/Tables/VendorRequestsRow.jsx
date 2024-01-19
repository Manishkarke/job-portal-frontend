import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  changeToVendor,
  rejectVendorRequest,
} from "../../Redux/Feature/admin/adminAction";

// Tailwind classes
const tailwindClass = {
  tableBodyRow: " hover:bg-slate-500",
  tableBodyItem: "text-center py-4  border-b border-solid py-2 ",
  tableActionCol: "flex justify-center gap-4 items-center",
  tableButton:
    " px-3 py-1 bg-black text-white rounded-lg capitalize font-medium",
};

export const VendorRequestsRow = ({
  id,
  userId,
  name,
  email,
  service,
  contact,
  address,
  setRefresh,
}) => {
  const dispatch = useDispatch();

  const approveRequest = () => {
    dispatch(changeToVendor({ userId, toast }));
    setRefresh(true);
  };
  const rejectRequest = () => {
    dispatch(rejectVendorRequest({ userId, toast }));
    setRefresh(true);
  };
  return (
    <tr className={tailwindClass.tableBodyRow}>
      <td className={`${tailwindClass.tableBodyItem}`}>{name}</td>
      <td className={`${tailwindClass.tableBodyItem} lowercase`}>{email}</td>
      <td className={`${tailwindClass.tableBodyItem}`}>{service}</td>
      <td className={`${tailwindClass.tableBodyItem}`}>{contact}</td>
      <td className={`${tailwindClass.tableBodyItem}`}>{address}</td>
      <td
        className={`${tailwindClass.tableBodyItem} ${tailwindClass.tableActionCol}`}
      >
        <button
          type="button"
          className={`${tailwindClass.tableButton} bg-lime-500`}
          onClick={approveRequest}
        >
          <i className="fa-solid fa-check"></i>
        </button>
        <button
          type="button"
          className={`${tailwindClass.tableButton} bg-red-700`}
          onClick={rejectRequest}
        >
          <i className="fa-solid fa-x"></i>
        </button>
      </td>
    </tr>
  );
};
