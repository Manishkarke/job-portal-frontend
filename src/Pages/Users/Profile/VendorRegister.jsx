import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { requestToBeVendor } from "../../../Redux/Feature/user/Auth/authAction";
import { toast } from "react-toastify";
import { getDataFromLocalStorage } from "../../../utils/localStorage";

const tailwindClass = {
  formBox:
    "border border-solid rounded-lg shadow grid gap-x-4 gap-y-4 min-h-full px-6 py-12 lg:px-8",
  inputField:
    "block w-full p-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
  label: "block text-sm font-medium leading-6 capitalize text-gray-900",
  links:
    "font-semibold capitalize ml-1 leading-6 text-indigo-600 hover:text-indigo-500",
  button:
    "flex w-full col-span-2  max-w-52 justify-center capitalize rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
  title:
    " text-center text-2xl font-bold leading-9 tracking-tight text-gray-900",
};
export const VendorRegister = () => {
  const user = JSON.parse(getDataFromLocalStorage("user"));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    designation: "",
    service: "",
    contact: "",
    address: "",
  });

  // For Error handling
  const [errors, setErrors] = useState({});
  const [isFormSubmitted, setFormSubmitted] = useState(false);
  let isFormValid = true;

  React.useEffect(() => {
    for (let error in errors) {
      if (errors[error]) {
        isFormValid = false;
        break;
      }
    }
  }, [errors, isFormSubmitted, isFormValid]);
  const handleInputFieldChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    setFormSubmitted(false);
    if (isFormSubmitted && isFormValid) {
      dispatch(requestToBeVendor({ formData, toast, navigate }));
    }
  };
  return (
    <section>
      <h2 className={tailwindClass.title}>Fill up the form for registration</h2>

      <form
        action="POST"
        className={tailwindClass.formBox}
        onSubmit={formSubmitHandler}
      >
        <div>
          <label htmlFor="name" className={tailwindClass.label}>
            name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            className={`${tailwindClass.inputField} cursor-not-allowed`}
            onChange={handleInputFieldChange}
            disabled
          />
        </div>

        <div>
          <label htmlFor="email" className={tailwindClass.label}>
            email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            className={`${tailwindClass.inputField} cursor-not-allowed`}
            onChange={handleInputFieldChange}
            disabled
          />
        </div>

        <div>
          <label htmlFor="designation" className={tailwindClass.label}>
            designation
          </label>
          <input
            type="text"
            name="designation"
            id="designation"
            value={formData.designation}
            className={tailwindClass.inputField}
            onChange={handleInputFieldChange}
          />
        </div>

        <div>
          <label htmlFor="service" className={tailwindClass.label}>
            service
          </label>
          <input
            type="text"
            name="service"
            id="service"
            value={formData.service}
            className={tailwindClass.inputField}
            onChange={handleInputFieldChange}
          />
        </div>

        <div>
          <label htmlFor="contact" className={tailwindClass.label}>
            contact
          </label>
          <input
            type="text"
            name="contact"
            id="contact"
            value={formData.contact}
            className={tailwindClass.inputField}
            onChange={handleInputFieldChange}
          />
        </div>

        <div>
          <label htmlFor="address" className={tailwindClass.label}>
            address
          </label>
          <input
            type="text"
            name="address"
            id="address"
            value={formData.address}
            className={tailwindClass.inputField}
            onChange={handleInputFieldChange}
          />
        </div>

        <button type="submit" className={tailwindClass.button}>
          register as vendor
        </button>
      </form>
    </section>
  );
};
