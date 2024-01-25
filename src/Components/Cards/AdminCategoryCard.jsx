import React from "react";
import engineerImg from "../../assets/images/engineer.jpg";
import { useDispatch } from "react-redux";
import { deleteCategory } from "../../Redux/Feature/admin/adminAction";
import { toast } from "react-toastify";

const tailwindCLass = {
  card: "max-w-80 flex flex-col gap-3 shadow-sm border border-solid rounded-lg py-2 px-4",
  imgCard: "w-full aspect-video rounded-md overflow-hidden",
  categoryName: "text-xl font-semibold",
  button:
    "flex w-full justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 capitalize",
};
export const AdminCategoryCard = ({ image, category, id, DeleteCategory }) => {
  const dispatch = useDispatch();

  const handleDeleteButton = () => {
    dispatch(deleteCategory({ id, DeleteCategory, toast }));
  };
  return (
    <article className={tailwindCLass.card}>
      <div className={tailwindCLass.imgCard}>
        <img
          className="w-full object-cover"
          src={image}
          alt={category}
          loading="lazy"
        />
      </div>
      <h3 className={tailwindCLass.categoryName}>{category}</h3>
      <button
        type="button"
        className={tailwindCLass.button}
        onClick={handleDeleteButton}
      >
        delete category
      </button>
    </article>
  );
};
