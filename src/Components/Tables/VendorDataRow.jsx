import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { deleteAVendor } from "../../Redux/Feature/admin/adminAction";
import { toast } from "react-toastify";

// Tailwind classes
const tailwindClass = {
  tableBodyItem: "text-center pt-2 border-b border-solid py-2",
  tableActionCol: "flex justify-center gap-2 items-center",
  tableButton:
    " px-3 py-1 bg-black text-white rounded-lg capitalize font-medium",
};

export const VendorDataRow = ({
  id,
  name,
  email,
  service,
  contact,
  address,
  setRefresh,
}) => {
  const dispatch = useDispatch();
  useEffect(() => {}, []);
  const deleteVendor = () => {
    dispatch(deleteAVendor({ id, toast, checkVendor }));
    setRefresh(true);
  };
  return (
    <tr>
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
        >
          <i className="fa-solid fa-eye"></i>
        </button>
        <button
          type="button"
          className={`${tailwindClass.tableButton} bg-red-700`}
          onClick={deleteVendor}
        >
          <i className="fa-regular fa-trash-can"></i>
        </button>
      </td>
    </tr>
  );
};
