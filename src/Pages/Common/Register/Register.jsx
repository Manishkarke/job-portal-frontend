import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userRegister } from "../../../Redux/Feature/user/Auth/authAction";
import { toast } from "react-toastify";

// Tailwind Class Name
const tailwindClass = {
  box: "max-w-lg mt-10 mx-auto border border-solid rounded-lg shadow flex min-h-full flex-col justify-center align-center px-6 py-12 lg:px-8",
  inputField:
    "block w-full p-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
  label: "block text-sm font-medium leading-6 capitalize text-gray-900",
  links:
    "font-semibold capitalize ml-1 leading-6 text-indigo-600 hover:text-indigo-500",
  button:
    "flex w-full justify-center capitalize rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
  title:
    "mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900",
};

function Register() {
  // hooks functions
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Component states
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // State Handling functions
  const fullNameChangeHandler = (e) => {
    setFormData((prevFormData) => {
      return { ...prevFormData, name: e.target.value };
    });
  };
  const emailChangeHandler = (e) => {
    setFormData((prevFormData) => {
      return { ...prevFormData, email: e.target.value };
    });
  };

  const passwordChangeHandler = (e) => {
    setFormData((prevFormData) => {
      return { ...prevFormData, password: e.target.value };
    });
  };

  const confirmPasswordChangeHandler = (e) => {
    setFormData((prevFormData) => {
      return { ...prevFormData, confirmPassword: e.target.value };
    });
  };

  // Form submission handler function
  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (
      formData.password.trim() === "" ||
      formData.confirmPassword.trim() === ""
    ) {
      toast.error("Please enter the password");
    } else if (formData.confirmPassword !== formData.password) {
      toast.error("Passwords do not match");
    } else {
      const { name, email, password } = formData;
      dispatch(userRegister({ name, email, password, navigate, toast }));
    }
  };

  return (
    <div className={tailwindClass.box}>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className={tailwindClass.title}>Register new account</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" method="POST" onSubmit={formSubmitHandler}>
          <div>
            <label htmlFor="fullName" className={tailwindClass.label}>
              full name
            </label>
            <div className="mt-2">
              <input
                id="fullName"
                name="fullName"
                type="text"
                value={formData.name}
                onChange={fullNameChangeHandler}
                autoComplete="fullName"
                className={tailwindClass.inputField}
              />
            </div>
          </div>
          <div>
            <label htmlFor="email" className={tailwindClass.label}>
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={emailChangeHandler}
                autoComplete="email"
                className={tailwindClass.inputField}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className={tailwindClass.label}>
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={passwordChangeHandler}
                autoComplete="current-password"
                className={tailwindClass.inputField}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="confirmPassword" className={tailwindClass.label}>
                confirm password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={confirmPasswordChangeHandler}
                autoComplete="current-password"
                className={tailwindClass.inputField}
              />
            </div>
          </div>

          <div>
            <button type="submit" className={tailwindClass.button}>
              sign up
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          already have an account?
          <Link to={"/login"} className={tailwindClass.links}>
            sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
