import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../../Components/Button";
import { getCategories } from "../../../Redux/Feature/Commons/commonAction";
import { createJobValidation } from "../../../utils/dataValidator";
import { postJob } from "../../../Redux/Feature/Vendor/vendorAction";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import InputField from "../../../Components/FormComponents/InputField";

// Tailwind Class Name
const tailwindClass = {
  box: "grid gap-5 border border-solid rounded-lg md:grid-cols-2 shadow flex min-h-full flex-col justify-center align-center px-6 py-6 lg:px-8",
  inputField: `block p-1.5 w-full h-9 border-solid text-gray-900 shadow-sm sm:text-sm sm:leading-6 rounded-md ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring focus:ring-indigo-600`,
  input: "h-full px-2",
  label: "block text-sm font-medium leading-6 capitalize text-gray-900",
  links: "font-semibold capitalize ml-1 leading-6 text-orange-600 hover:text-orange-500",
  title: " text-center text-2xl font-bold leading-9 tracking-tight text-gray-900",
  error: "text-red-600 text-sm",
};

export const CreateJob = () => {
  const categories = useSelector((state) => state.common.categories);
  const [formData, setFormData] = React.useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    deadline: "",
    categoryId: categories[0]?._id,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];

  // for error handling
  const [errors, setErrors] = React.useState();
  const [isFormSubmitted, setIsFormSubmitted] = React.useState(false);
  let isFormValid = true;

  const inputFieldChangeHandler = (event) => {
    setFormData((prevFormData) => {
      return { ...prevFormData, [event.target.name]: event.target.value };
    });
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    createJobValidation(formData, setErrors);
    setIsFormSubmitted(true);
  };

  React.useEffect(() => {
    dispatch(getCategories());
    for (const error in errors) {
      if (errors[error]) {
        isFormValid = false;
        break;
      }
    }

    if (isFormValid && isFormSubmitted) {
      dispatch(postJob({ formData, toast, navigate }));
    }

    if (isFormSubmitted) setIsFormSubmitted(false);
  }, [categories, isFormSubmitted, isFormValid]);

  return (
    <section>
      <div className="flex justify-between items-center p-4">
        <h2 className="text-xl capitalize font-semibold">post job</h2>
        <Button type="button" navigateTo="/vendor/jobs">
          back
        </Button>
      </div>

      <form className={tailwindClass.box} onSubmit={formSubmitHandler}>
        {/* Title Input field */}
        <InputField
          id="title"
          label="title"
          type="text"
          name="title"
          value={formData.title}
          error={errors?.title}
          onChange={inputFieldChangeHandler}
        />

        {/* Description Input field */}
        <InputField
          id="description"
          label="description"
          type="text"
          name="description"
          value={formData.description}
          onChange={inputFieldChangeHandler}
          error={errors?.description}
        />

        {/* Location input field */}
        <InputField
          id="location"
          label="location"
          type="text"
          name="location"
          value={formData.location}
          onChange={inputFieldChangeHandler}
          error={errors?.location}
        />

        {/* Salary Input field */}
        <InputField
          id="salary"
          label="salary"
          name="salary"
          type="text"
          value={formData.salary}
          onChange={inputFieldChangeHandler}
          error={errors?.salary}
        />

        {/* Deadline Input field */}
        <InputField
          id="deadline"
          label="deadline"
          type="date"
          name="deadline"
          value={formData.deadline}
          min={today}
          onChange={inputFieldChangeHandler}
          error={errors?.deadline}
        />
        {/* <div>
          <label htmlFor="deadline" className={tailwindClass.label}>
            deadline
          </label>
          <input
            type="date"
            name="deadline"
            id="deadline"
            value={formData.deadline}
            min={today}
            className={`${tailwindClass.inputField} ${errors?.deadline ? "ring-red-600" : ""}`}
            onChange={inputFieldChangeHandler}
          />
          {errors?.deadline && <span className={tailwindClass.error}>{errors?.deadline}</span>}
        </div> */}

        {/* Category input field */}
        <div>
          <label htmlFor="categoryId" className={tailwindClass.label}>
            category
          </label>
          <select
            type="date"
            name="categoryId"
            id="categoryId"
            className={`${tailwindClass.inputField} ${errors?.category ? "ring-red-600" : ""}`}
            value={formData.categoryId}
            onChange={inputFieldChangeHandler}
          >
            <option value="">select category</option>
            {categories?.map((category) => (
              <option key={category._id} value={category._id}>
                {category.category}
              </option>
            ))}
          </select>
          {errors?.category && <span className={tailwindClass.error}>{errors?.category}</span>}
        </div>

        <Button type="submit" customization="md:col-span-2 md:max-w-fit md:justify-self-end">
          create post
        </Button>
      </form>
    </section>
  );
};
