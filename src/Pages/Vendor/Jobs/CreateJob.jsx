import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../../Components/Button";
import { getCategories } from "../../../Redux/Feature/Commons/commonAction";

// Tailwind Class Name
const tailwindClass = {
  box: "grid gap-5 border border-solid rounded-lg lg:grid-cols-2 shadow flex min-h-full flex-col justify-center align-center px-6 py-6 lg:px-8",
  inputField: `block p-1.5 w-full h-9 border-solid text-gray-900 shadow-sm sm:text-sm sm:leading-6 rounded-md ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring focus:ring-indigo-600`,
  input: "h-full px-2",
  label: "block text-sm font-medium leading-6 capitalize text-gray-900",
  links:
    "font-semibold capitalize ml-1 leading-6 text-orange-600 hover:text-orange-500",
  title:
    " text-center text-2xl font-bold leading-9 tracking-tight text-gray-900",
  error: "text-red-600 text-sm",
};

export const CreateJob = () => {
  const [formData, setFormData] = React.useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    deadline: "",
    categoryId: "",
  });
  const categories = useSelector((state) => state.categories);
  const dispatch = useDispatch();

  const today = new Date().toISOString().split("T")[0];

  // for error handling
  const [errors, setErrors] = React.useState();

  const inputFieldChangeHandler = (event) => {
    setFormData((prevFormData) => {
      return { ...prevFormData, [event.target.name]: event.target.value };
    });

    console.log(
      "name: " + [event.target.name] + " value: " + event.target.value
    );
  };

  React.useEffect(() => {
    dispatch(getCategories());
  }, [categories, dispatch]);
  return (
    <section>
      <div className="flex justify-between items-center p-4">
        <h2 className="text-xl capitalize font-semibold">post job</h2>
        <Button type="button" navigateTo="/vendor/jobs">
          back
        </Button>
      </div>

      <form className={tailwindClass.box}>
        <div>
          <label htmlFor="title" className={tailwindClass.label}>
            title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            className={`${tailwindClass.inputField}`}
            onChange={inputFieldChangeHandler}
          />
        </div>
        <div>
          <label htmlFor="description" className={tailwindClass.label}>
            description
          </label>
          <input
            type="text"
            name="description"
            id="description"
            value={formData.description}
            className={`${tailwindClass.inputField}`}
            onChange={inputFieldChangeHandler}
          />
        </div>

        <div>
          <label htmlFor="location" className={tailwindClass.label}>
            location
          </label>
          <input
            type="text"
            name="location"
            id="location"
            value={formData.location}
            className={`${tailwindClass.inputField}`}
            onChange={inputFieldChangeHandler}
          />
        </div>
        <div>
          <label htmlFor="salary" className={tailwindClass.label}>
            salary
          </label>
          <input
            type="number"
            name="salary"
            id="salary"
            value={formData.salary}
            className={`${tailwindClass.inputField}`}
            onChange={inputFieldChangeHandler}
          />
        </div>

        <div>
          <label htmlFor="deadline" className={tailwindClass.label}>
            deadline
          </label>
          <input
            type="date"
            name="deadline"
            id="deadline"
            value={formData.deadline}
            min={today}
            className={`${tailwindClass.inputField}`}
            onChange={inputFieldChangeHandler}
          />
        </div>
        <div>
          <label htmlFor="categoryId" className={tailwindClass.label}>
            category
          </label>
          <select
            type="date"
            name="categoryId"
            id="categoryId"
            className={`${tailwindClass.inputField}`}
            onChange={inputFieldChangeHandler}
          >
            {categories?.map((category) => (
              <option key={category._id} value={category._id}>
                {category.category}
              </option>
            ))}
          </select>
        </div>
      </form>
    </section>
  );
};
