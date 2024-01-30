import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "../../../Components/Button";
import { RegisterPageLayout } from "../../../Layouts/RegisterPageLayout";
import { userLogin } from "../../../Redux/Feature/user/Auth/authAction";
import { loginValidator } from "../../../utils/ErrorHandler";

// Tailwind Class Name
const tailwindClass = {
  box: "max-w-lg mx-auto border border-solid rounded-lg shadow grid gap-5 align-center p-6 lg:px-8",
  inputField: `block p-1.5 w-full h-9 border-solid text-gray-900 shadow-sm sm:text-sm sm:leading-6 rounded-md ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring focus:ring-indigo-600`,
  input: "h-full px-2",
  label: "block text-sm font-medium leading-6 text-gray-900",
  links: `font-semibold capitalize ml-1 leading-6 text-orange-600 hover:text-orange-500`,
  title:
    "text-center text-2xl font-bold leading-9 tracking-tight text-gray-900",
  error: "text-red-600 capitalize text-sm",
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
  const [showPassword, setShowPassword] = React.useState(false);

  const [errors, setErrors] = React.useState({
    email: "",
    password: "",
  });
  let isFormValid = true;
  const [isFormSubmitted, setFormSubmitted] = React.useState(false);

  // State handling Functions
  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => {
      return { ...prevFormData, [name]: value };
    });
  };

  // Handle form submission
  const formSubmitHandler = (event) => {
    event.preventDefault();

    loginValidator(formData, setErrors);
    setFormSubmitted(true);
  };

  React.useEffect(() => {
    for (const error in errors) {
      if (errors[error]) {
        isFormValid = false;
        break;
      }
    }

    if (isFormValid && isFormSubmitted) {
      const { email, password } = formData;
      dispatch(userLogin({ email, password, navigate, toast }));
    }

    if (isFormSubmitted) setFormSubmitted(false);
  }, [isFormSubmitted, isFormValid]);

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
              <div className={`${tailwindClass.inputField}`}>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={inputChangeHandler}
                  autoComplete="email"
                  className={`${tailwindClass.input} w-full`}
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
                <div className="text-sm">
                  <a href="#" className={tailwindClass.links}>
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className={`${tailwindClass.inputField} relative flex`}>
                <input
                  id="password"
                  name="password"
                  type={`${showPassword ? "text" : "password"}`}
                  value={formData.password}
                  onChange={inputChangeHandler}
                  autoComplete="current-password"
                  className={`${tailwindClass.input}`}
                />
                <span
                  className="h-full border-l border-solid w-10 grid text-orange-600 hover:text-orange-500 place-content-center absolute top-0 right-0"
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                >
                  <i
                    class={`fa-solid fa-${showPassword ? "eye-slash" : "eye"}`}
                  ></i>
                </span>
              </div>
              {errors.password && (
                <span className={tailwindClass.error}>{errors.password}</span>
              )}
            </div>

            <Button type="submit" fullWidth={true}>
              sign in
            </Button>
          </form>

          <p className="text-center text-sm text-gray-500">
            don&apos;t have an account?
            <Link to={"/register"} className={tailwindClass.links}>
              register
            </Link>
          </p>
        </div>
      </div>
    </RegisterPageLayout>
  );
}
