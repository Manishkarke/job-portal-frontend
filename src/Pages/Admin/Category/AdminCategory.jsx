import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AdminCategoryCard } from "../../../Components/Cards/AdminCategoryCard";
import { FormModal } from "../../../Components/Modal/FormModal";
import { ModalLayout } from "../../../Components/Modal/ModalLayout";
import { AdminPageLayout } from "../../../Layouts/AdminPageLayout";
import { getAllCategory } from "../../../Redux/Feature/admin/adminAction";

const tailwindCLass = {
  section: "flex flex-col relative",
  pageHeader: "text-2xl capitalize text-center py-2",
  cardList:
    "col-span-2 grid grid-cols-4 grid-flow-rows items-end gap-x-10 gap-y-10 mx-auto py-7",
  button:
    "flex place-self-center max-w-44 rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 capitalize",
};

export const AdminCategory = () => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.admin.categories);

  useEffect(() => {
    dispatch(getAllCategory());
  }, []);

  return (
    <AdminPageLayout>
      <section className={tailwindCLass.section}>
        <div className="flex justify-between px-10 py-2 shadow-lg rounded-lg sticky top-0 bg-white">
          <h2 className={tailwindCLass.pageHeader}>categories</h2>
          <button
            type="button"
            className={tailwindCLass.button}
            onClick={() => {
              setShowModal(true);
            }}
          >
            add category
          </button>
        </div>
        {categories.length === 0 ? (
          <h2>There is no any category in the db</h2>
        ) : (
          <ul className={tailwindCLass.cardList}>
            {categories.map(({ _id, image, category }) => {
              return (
                <li className="w-fit" key={_id}>
                  <AdminCategoryCard image={image} category={category} />
                </li>
              );
            })}
          </ul>
        )}
      </section>
      {showModal && (
        <ModalLayout closeModal={setShowModal}>
          <FormModal closeModal={setShowModal} />
        </ModalLayout>
      )}
    </AdminPageLayout>
  );
};
