import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { userLogin } from "../../Redux/Feature/user/Auth/authAction";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

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

  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (formData.email.trim() === "" || formData.password.trim() === "") {
      toast.error("Please enter all fields");
    } else {
      const { email, password } = formData;
      dispatch(userLogin({ email, password, navigate, toast }));
    }
  };
  return (
    <div className="max-w-lg mt-10 mx-auto border border-solid rounded-lg shadow flex min-h-full flex-col justify-center align-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" method="POST" onSubmit={formSubmitHandler}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
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
                className="block w-full p-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
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
                className="block w-full p-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          don't have an account?
          <Link
            to={"/register"}
            className="font-semibold capitalize ml-1 leading-6 text-indigo-600 hover:text-indigo-500"
          >
            register
          </Link>
        </p>
      </div>
    </div>
  );
}
