import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllVendor } from "../../../Redux/Feature/admin/adminAction";
import { VendorsTableHeader } from "../../../Components/Tables/VendorsTableHeader";
import { VendorRequestsRow } from "../../../Components/Tables/VendorRequestsRow";
import { Button } from "../../../Components/Button";

// Tailwind Classes
const tailwindCLass = {
  section: "flex flex-col relative",
  pageHeader: "text-2xl capitalize text-center py-2",
  button:
    "flex place-self-center max-w-44 rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 capitalize",
};
export const VendorRequests = () => {
  const [refresh, setRefresh] = useState(false);
  const vendors = useSelector((state) => state.admin.vendors);

  // Instance of hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllVendor());

    if (refresh) {
      setRefresh(false);
    }
  }, [dispatch, refresh]);

  const vendorRequests = vendors?.filter(
    (vendor) => vendor.status === "pending"
  );
  return (
    <>
      <section className={`${tailwindCLass.section}`}>
        <div className="flex justify-between items-center px-10 py-2 shadow-lg bg-white z-10 rounded-lg sticky top-0 ">
          <h2 className={tailwindCLass.pageHeader}>vendor requests</h2>
          <Button
            type="button"
            onClick={() => {
              navigate("/admin/vendors/");
            }}
          >
            back
          </Button>
        </div>
        {vendorRequests ? (
          <table className="w-full capitalize relative overflow-x-scroll">
            <VendorsTableHeader />
            <tbody>
              {vendorRequests.map((vendor) => {
                return (
                  <VendorRequestsRow
                    key={vendor._id}
                    userId={vendor.userId}
                    id={vendor._id}
                    name={vendor.name}
                    email={vendor.email}
                    service={vendor.service}
                    contact={vendor.contact}
                    address={vendor.address}
                    setRefresh={setRefresh}
                  />
                );
              })}
            </tbody>
          </table>
        ) : (
          <p>No vendor requests</p>
        )}
      </section>
    </>
  );
};
