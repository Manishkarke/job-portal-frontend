import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AdminCategoryCard } from "../../../Components/Cards/AdminCategoryCard";
import { FormModal } from "../../../Components/Modal/FormModal";
import { ModalLayout } from "../../../Components/Modal/ModalLayout";
import { Button } from "../../../Components/Button";
import { getCategories } from "../../../Redux/Feature/Commons/commonAction";
import axios from "axios";

const tailwindCLass = {
  section: "flex flex-col relative",
  pageHeader: "text-2xl capitalize text-center py-2",
  cardList:
    "col-span-2 grid grid-cols-4 grid-flow-rows items-end gap-x-10 gap-y-10 mx-auto py-7",
};

export const AdminCategory = () => {
  const [showModal, setShowModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const source = axios.CancelToken.source();
    dispatch(getCategories(source.token));
    setUploading(false);
    setDeleting(false);

    return () => {
      source.cancel();
    };
  }, [dispatch, uploading, showModal, deleting]);
  const categories = useSelector((state) => state.common.categories);

  return (
    <>
      <section className={tailwindCLass.section}>
        <div className="flex justify-between items-center px-10 py-2 shadow-lg rounded-lg sticky top-0 bg-white">
          <h2 className={tailwindCLass.pageHeader}>categories</h2>
          <Button
            type="button"
            onClick={() => {
              setShowModal(true);
            }}
          >
            add category
          </Button>
        </div>
        {categories?.length === 0 ? (
          <h2>There is no any category in the db</h2>
        ) : (
          <ul className={tailwindCLass.cardList}>
            {categories?.map(({ _id, image, category }) => {
              return (
                <li className="w-fit" key={_id}>
                  <AdminCategoryCard
                    id={_id}
                    image={image}
                    category={category}
                    DeleteCategory={setDeleting}
                  />
                </li>
              );
            })}
          </ul>
        )}
      </section>
      {showModal && (
        <ModalLayout closeModal={setShowModal}>
          <FormModal closeModal={setShowModal} uploading={setUploading} />
        </ModalLayout>
      )}
    </>
  );
};
