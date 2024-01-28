import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userRegister } from "../../../Redux/Feature/user/Auth/authAction";
import { toast } from "react-toastify";
import { RegisterPageLayout } from "../../../Layouts/RegisterPageLayout";
import { registrationValidator } from "../../../utils/ErrorHandler";

// Tailwind Class Name
const tailwindClass = {
  box: "border border-solid rounded-lg shadow flex min-h-full flex-col justify-center align-center px-6 py-12 lg:px-8",
  inputField:
    "block w-full p-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
  label: "block text-sm font-medium leading-6 capitalize text-gray-900",
  links:
    "font-semibold capitalize ml-1 leading-6 text-indigo-600 hover:text-indigo-500",
  button:
    "flex w-full justify-center capitalize rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
  title:
    " text-center text-2xl font-bold leading-9 tracking-tight text-gray-900",
  error: "text-red-600 capitalize text-sm",
};

// TODO: CHanges starts here

function Register() {
  // hooks functions
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Component form state states
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // For FOrm validation
  const [isFormSubmitted, setFormSubmitted] = React.useState(false); // to check if submit button is clicked
  const [errors, setErrors] = React.useState({}); // to store error states
  const [isFormValid, setIsFormValid] = React.useState(true); // to check if form is valid

  React.useEffect(() => {
    for (const error in errors) {
      if (errors[error]) {
        setIsFormValid(false); // if There is any error then
        break;
      } else {
        setIsFormValid(true);
      }
    }
    console.log(
      "form submision values: " +
        isFormSubmitted +
        " is FormValid ? " +
        isFormValid
    );
  }, [errors, isFormValid, isFormSubmitted]);

  // State Handling functions
  const inputFieldChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => {
      return { ...prevFormData, [name]: value };
    });
  };

  // Form submission handler function
  const formSubmitHandler = (e) => {
    e.preventDefault();

    registrationValidator(formData, setErrors); //Form Validator function
    setFormSubmitted(true);

    if (isFormValid && isFormSubmitted) {
      const { name, email, password } = formData;
      dispatch(
        userRegister({
          name,
          email,
          password,
          navigate,
          toast,
          setFormSubmitted,
        })
      );
    } else if (isFormSubmitted) {
      setFormSubmitted(false);
    }
  };

  return (
    <RegisterPageLayout>
      <div className={tailwindClass.box}>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className={tailwindClass.title}>Register new account</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            method="POST"
            onSubmit={formSubmitHandler}
          >
            <div>
              <label htmlFor="fullName" className={tailwindClass.label}>
                full name
              </label>
              <div className="mt-2">
                <input
                  id="fullName"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={inputFieldChangeHandler}
                  autoComplete="fullName"
                  className={tailwindClass.inputField}
                />
              </div>
              {errors.name && (
                <span className={tailwindClass.error}>{errors.name}</span>
              )}
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
                  onChange={inputFieldChangeHandler}
                  autoComplete="email"
                  className={tailwindClass.inputField}
                />
              </div>
              {errors.email && (
                <span className={tailwindClass.error}>{errors.email}</span>
              )}
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
                  onChange={inputFieldChangeHandler}
                  autoComplete="current-password"
                  className={tailwindClass.inputField}
                />
              </div>
              {errors.password && (
                <span className={tailwindClass.error}>{errors.password}</span>
              )}
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="confirmPassword"
                  className={tailwindClass.label}
                >
                  confirm password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={inputFieldChangeHandler}
                  autoComplete="current-password"
                  className={tailwindClass.inputField}
                />
              </div>
              {errors.confirmPassword && (
                <span className={tailwindClass.error}>
                  {errors.confirmPassword}
                </span>
              )}
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
    </RegisterPageLayout>
  );
}

export default Register;
