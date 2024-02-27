import React from "react";
import { useDispatch } from "react-redux";
import { deleteCategory } from "../../Redux/Feature/admin/adminAction";
import { toast } from "react-toastify";
import { Button } from "../Button";

const tailwindCLass = {
  card: "max-w-80 flex flex-col gap-3 shadow-sm border border-solid rounded-lg py-2 px-4",
  imgCard: "w-full aspect-video rounded-md overflow-hidden",
  categoryName: "text-xl capitalize font-semibold",
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
      <Button type="button" onClick={handleDeleteButton} customization="w-full">
        delete category
      </Button>
    </article>
  );
};
