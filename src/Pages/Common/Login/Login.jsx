import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "../../../Components/Button";
import { RegisterPageLayout } from "../../../Layouts/RegisterPageLayout";
import { userLogin } from "../../../Redux/Feature/user/Auth/authAction";

// Tailwind Class Name
const tailwindClass = {
  box: "max-w-lg mx-auto border border-solid rounded-lg shadow grid gap-5 align-center p-6 lg:px-8",
  inputField: `block w-full p-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`,
  label: "block text-sm font-medium leading-6 text-gray-900",
  links: `font-semibold capitalize ml-1 leading-6 text-orange-600 hover:text-orange-500`,
  title:
    "text-center text-2xl font-bold leading-9 tracking-tight text-gray-900",
  error: "text-red-600 capitalize",
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

  const [error, setError] = React.useState({});
  // const [isFormReady, setFormReady] = React.useState(false);
  const [isFormSubmitted, setFormSubmitted] = React.useState(false);

  // React.useEffect(() => {
  //   if (isFormSubmitted && !error.email && !error.password) {
  //     // Set the form ready to submit
  //     setFormReady(true);
  //     setFormSubmitted(true);
  //   }
  // }, [error.email, error.password, isFormSubmitted]);
  // State handling Functions
  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => {
      return { ...prevFormData, [name]: value };
    });
  };

  // Handle form submission
  // const formSubmitHandler = (event) => {
  //   event.preventDefault();

  //   if (isFormReady) {
  //     const { email, password } = formData;
  //     console.log("form submitted");
  //     dispatch(userLogin({ email, password, navigate, toast }));
  //   } else {
  //     if (formData.email.trim() === "") {
  //       setError((prevError) => {
  //         return { ...prevError, email: "email is required." };
  //       });
  //     } else {
  //       setError((prevError) => {
  //         return { ...prevError, email: "" };
  //       });
  //     }

  //     if (formData.password.trim() === "") {
  //       setError((prevError) => {
  //         return { ...prevError, password: "password is required." };
  //       });
  //     } else {
  //       setError((prevError) => {
  //         return { ...prevError, password: "" };
  //       });
  //     }
  //     setFormSubmitted(true);
  //   }
  // };
  // Handle form submission
  const formSubmitHandler = (event) => {
    event.preventDefault();

    // Reset errors
    setError({ email: "", password: "" });

    // Check for empty fields
    if (formData.email.trim() === "") {
      setError((prevError) => ({ ...prevError, email: "Email is required." }));
    }

    if (formData.password.trim() === "") {
      setError((prevError) => ({
        ...prevError,
        password: "Password is required.",
      }));
    }

    // Check if there are no errors
    if (!error.email && !error.password) {
      console.log("Form submitted");
      dispatch(
        userLogin({
          email: formData.email,
          password: formData.password,
          navigate,
          toast,
        })
      );
    }

    // Set form as submitted
    setFormSubmitted(true);
  };

  return (
    <RegisterPageLayout>
      <div className={tailwindClass.box}>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className={tailwindClass.title}>Sign in to your account</h2>
        </div>

        <div className="grid gap-5 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="grid gap-4"
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
                  onChange={inputChangeHandler}
                  autoComplete="email"
                  className={`${tailwindClass.inputField}`}
                />
              </div>
              {error.email && (
                <span className={tailwindClass.error}>{error.email}</span>
              )}
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
                  onChange={inputChangeHandler}
                  autoComplete="current-password"
                  className={tailwindClass.inputField}
                />
              </div>
              {error.password && (
                <span className={tailwindClass.error}>{error.password}</span>
              )}
            </div>

            <Button type="submit" fullWidth={true}>
              sign in
            </Button>
          </form>

          <p className="text-center text-sm text-gray-500">
            don't have an account?
            <Link to={"/register"} className={tailwindClass.links}>
              register
            </Link>
          </p>
        </div>
      </div>
    </RegisterPageLayout>
  );
}
