import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { VendorDataRow } from "../../../Components/Tables/VendorDataRow";
import { VendorsTableHeader } from "../../../Components/Tables/VendorsTableHeader";
import { AdminPageLayout } from "../../../Layouts/AdminPageLayout";
import { getAllVendor } from "../../../Redux/Feature/admin/adminAction";

// Tailwind Classes
const tailwindCLass = {
  section: "flex flex-col relative",
  pageHeader: "text-2xl capitalize text-center py-2",
  button:
    "flex place-self-center max-w-44 rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 capitalize",
};

export const VendorList = () => {
  const vendors = useSelector((state) => state.admin.vendors);
  const [refresh, setRefresh] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getAllVendor());
    if (refresh) {
      setRefresh(false);
    }
  }, [dispatch, refresh]);
  return (
    <>
      <section>
        <div className="flex justify-between px-10 py-2 shadow-lg bg-white z-10 rounded-lg sticky top-0 ">
          <h2 className={tailwindCLass.pageHeader}>vendors</h2>
          <button
            type="button"
            className={tailwindCLass.button}
            onClick={() => {
              navigate("/admin/vendors/requests/");
            }}
          >
            vendor requests
          </button>
        </div>
        {vendors ? (
          <table className="w-full capitalize relative overflow-x-scroll">
            <VendorsTableHeader />
            <tbody>
              {vendors
                .filter((vendor) => vendor.status === "approved")
                .map((vendor) => {
                  return (
                    <VendorDataRow
                      setRefresh={setRefresh}
                      key={vendor._id}
                      id={vendor._id}
                      name={vendor.name}
                      email={vendor.email}
                      service={vendor.service}
                      contact={vendor.contact}
                      address={vendor.address}
                    />
                  );
                })}
            </tbody>
          </table>
        ) : (
          <p>No vendors here</p>
        )}
      </section>
    </>
  );
};
