import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Navigation } from "../../../Components/Navigations/User/Navigation";
import { userLogin } from "../../../Redux/Feature/user/Auth/authAction";

// Tailwind Class Name
const tailwindClass = {
  box: "max-w-lg mt-10 mx-auto border border-solid rounded-lg shadow flex min-h-full flex-col justify-center align-center px-6 py-12 lg:px-8",
  inputField:
    "block w-full p-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
  label: "block text-sm font-medium leading-6 text-gray-900",
  links:
    "font-semibold capitalize ml-1 leading-6 text-indigo-600 hover:text-indigo-500",
  button:
    "flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
  title:
    "mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900",
};

export default function Login() {
  // using Hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State for inputs
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  // State handling Functions
  const emailChangeHandler = (e) => {
    setFormData((prevData) => {
      return { ...prevData, email: e.target.value };
    });
  };
  const passwordChangeHandler = (e) => {
    setFormData((prevData) => {
      return { ...prevData, password: e.target.value };
    });
  };

  // Handle form submission
  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (formData.email.trim() === "" || formData.password.trim() === "") {
      toast.error("Please enter all fields");
    } else {
      const { email, password } = formData;
      dispatch(userLogin({ email, password, toast })).then((response) => {
        if (response.payload.status === 200) {
          toast.success(response.payload.message);

          if (response.payload.emailExists.role === "user") {
            navigate("/");
          } else if (response.payload.emailExists.role === "admin") {
            navigate("/admin");
          } else if (response.payload.emailExists.role === "vendor") {
            navigate("/vendor");
          }
        }
      });
    }
  };

  return (
    <>
      <Navigation />
      <div className={tailwindClass.box}>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className={tailwindClass.title}>Sign in to your account</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            method="POST"
            onSubmit={formSubmitHandler}
          >
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
                <div className="text-sm">
                  <a href="#" className={tailwindClass.links}>
                    Forgot password?
                  </a>
                </div>
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
              <button type="submit" className={tailwindClass.button}>
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            don't have an account?
            <Link to={"/register"} className={tailwindClass.links}>
              register
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
