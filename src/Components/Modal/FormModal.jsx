import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { createCategory } from "../../Redux/Feature/admin/adminAction";
import imgUpload from "../../assets/images/imgUpload.png";
const tailwindClass = {
  box: "max-w-lg mx-auto flex flex-col justify-center align-center px-6 py-12 lg:px-8",
  inputField:
    "block w-full p-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
  imageInputField:
    "w-full flex flex-col gap-2 cursor-pointer capitalize justify-center p-4 items-center rounded-md h-full border-2 border-dashed",
  label: "block capitalize text-sm font-medium leading-6 text-gray-900",
  button:
    "flex w-full justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 capitalize",
  title:
    "text-center text-2xl font-bold leading-9 tracking-tight text-gray-900",
};

export const FormModal = ({ closeModal }) => {
  const dispatch = useDispatch();
  const imageInputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    category: "",
    image: null,
  });

  // Category Name
  const categoryNameChangeHandler = (event) => {
    setFormData((prevFormData) => {
      return { ...prevFormData, category: event.target.value };
    });
  };

  // For Image Drag and drop
  const openFileMenu = () => {
    imageInputRef.current.click();
  };

  const handleInputChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const imageUrl = URL.createObjectURL(selectedFile);
      setImagePreview(imageUrl);

      setFormData((prevFormData) => {
        return { ...prevFormData, image: selectedFile };
      });
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      const imageUrl = URL.createObjectURL(droppedFile);
      setImagePreview(imageUrl);

      setFormData((prevFormData) => {
        return { ...prevFormData, image: droppedFile };
      });
    }
  };

  // Form Submit Handler
  const formSubmitHandler = (event) => {
    event.preventDefault();
    dispatch(createCategory({ formData, toast }));
    closeModal(true);
  };
  return (
    <section className={tailwindClass.box}>
      <h2 className={tailwindClass.title}>Add Category</h2>

      <form
        method="post"
        encType="multipart/form-data"
        className={"flex flex-col gap-2"}
        onSubmit={formSubmitHandler}
      >
        <div>
          <label htmlFor="category" className={tailwindClass.label}>
            category name
          </label>
          <div className="mt-2">
            <input
              id="category"
              name="category"
              type="text"
              autoComplete="category"
              value={formData.category}
              onChange={categoryNameChangeHandler}
              className={tailwindClass.inputField}
            />
          </div>
        </div>

        <div>
          <label htmlFor="categoryImage" className={tailwindClass.label}>
            category image
          </label>
          <div
            id="drop-area"
            className={`mt-2 ${tailwindClass.imageInputField}`}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <input
              ref={imageInputRef}
              id="categoryImage"
              name="image"
              accept="image/*"
              type="file"
              autoComplete="categoryImage"
              onChange={handleInputChange}
              hidden
            />
            <div
              id="img-view"
              className="w-full flex flex-col align-center text-center"
              onClick={openFileMenu}
            >
              {!imagePreview ? (
                <>
                  <img src={imgUpload} className="w-20 mx-auto" />
                  <p className="flex flex-col gap-3">
                    drag and drop or click here <br />
                    to upload
                    <span className="text-xs text-neutral-500">
                      upload any images from desktop
                    </span>
                  </p>
                </>
              ) : (
                <img
                  src={imagePreview}
                  className="w-full object-cover object-center rounded-md max-h-64"
                  alt="default"
                />
              )}
            </div>
          </div>
        </div>

        <button type="submit" className={tailwindClass.button}>
          add category
        </button>
      </form>
    </section>
  );
};
