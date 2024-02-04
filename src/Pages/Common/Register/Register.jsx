import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "../../../Components/Button";
import { RegisterPageLayout } from "../../../Layouts/RegisterPageLayout";
import { userRegister } from "../../../Redux/Feature/user/Auth/authAction";
import { registrationValidator } from "../../../utils/ErrorHandler";

// Tailwind Class Name
const tailwindClass = {
  box: "grid gap-5 border border-solid rounded-lg shadow flex min-h-full flex-col justify-center align-center px-6 py-6 lg:px-8",
  inputField: `block p-1.5 w-full h-9 border-solid text-gray-900 shadow-sm sm:text-sm sm:leading-6 rounded-md ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring focus:ring-indigo-600`,
  input: "h-full px-2",
  label: "block text-sm font-medium leading-6 capitalize text-gray-900",
  links:
    "font-semibold capitalize ml-1 leading-6 text-orange-600 hover:text-orange-500",
  title:
    " text-center text-2xl font-bold leading-9 tracking-tight text-gray-900",
  error: "text-red-600 text-sm",
  showPasswordIcon:
    "h-full border-l border-solid w-10 grid text-orange-600 hover:text-orange-500 place-content-center absolute top-0 right-0",
};

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
  const [showPassword, setShowPassword] = React.useState({
    password: false,
    confirmPassword: false,
  });

  // For FOrm validation
  const [isFormSubmitted, setFormSubmitted] = React.useState(false); // to check if submit button is clicked
  const [errors, setErrors] = React.useState({}); // to store error states
  let isFormValid = true; // to check if form is valid

  // State Handling functions
  const inputFieldChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => {
      return { ...prevFormData, [name]: value };
    });
  };

  // Show Passwords
  const showPassordNormal = () => {
    setShowPassword((prevShowPassword) => {
      return { ...prevShowPassword, password: !prevShowPassword.password };
    });
  };

  const showConfirmPassword = () => {
    setShowPassword((prevShowPassword) => {
      return {
        ...prevShowPassword,
        confirmPassword: !prevShowPassword.confirmPassword,
      };
    });
  };

  // Form submission handler function
  const formSubmitHandler = (e) => {
    e.preventDefault();

    registrationValidator(formData, setErrors); //Form Validator function
    setFormSubmitted(true);
  };

  React.useEffect(() => {
    for (const error in errors) {
      if (errors[error]) {
        isFormValid = false; // if There is any error then
        break;
      }
    }

    if (isFormValid && isFormSubmitted) {
      const { name, email, password } = formData;
      dispatch(
        userRegister({
          name,
          email,
          password,
          navigate,
          toast,
        })
      );
    }
    if (isFormSubmitted) {
      setFormSubmitted(false);
    }
  }, [isFormValid, isFormSubmitted]);

  return (
    <RegisterPageLayout>
      <div className={tailwindClass.box}>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className={tailwindClass.title}>Create new account</h2>
        </div>

        <div className="grid gap-5 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="grid gap-4"
            method="POST"
            onSubmit={formSubmitHandler}
          >
            <div>
              <label htmlFor="fullName" className={tailwindClass.label}>
                full name
              </label>
              <div className={`${tailwindClass.inputField}`}>
                <input
                  id="fullName"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={inputFieldChangeHandler}
                  autoComplete="fullName"
                  className={tailwindClass.input}
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
              <div className={`${tailwindClass.inputField}`}>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={inputFieldChangeHandler}
                  autoComplete="email"
                  className={tailwindClass.input}
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
              <div className={`${tailwindClass.inputField} flex relative`}>
                <input
                  id="password"
                  name="password"
                  type={`${showPassword.password ? "text" : "password"}`}
                  value={formData.password}
                  onChange={inputFieldChangeHandler}
                  autoComplete="current-password"
                  className={tailwindClass.input}
                />
                <span
                  className={tailwindClass.showPasswordIcon}
                  onClick={showPassordNormal}
                >
                  <i
                    className={`fa-solid fa-${
                      showPassword.password ? "eye-slash" : "eye"
                    }`}
                  ></i>
                </span>
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
              <div className={`${tailwindClass.inputField} flex relative`}>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={`${showPassword.confirmPassword ? "text" : "password"}`}
                  value={formData.confirmPassword}
                  onChange={inputFieldChangeHandler}
                  autoComplete="current-password"
                  className={tailwindClass.input}
                />

                <span
                  className={tailwindClass.showPasswordIcon}
                  onClick={showConfirmPassword}
                >
                  <i
                    className={`fa-solid fa-${
                      showPassword.confirmPassword ? "eye-slash" : "eye"
                    }`}
                  ></i>
                </span>
              </div>
              {errors.confirmPassword && (
                <span className={tailwindClass.error}>
                  {errors.confirmPassword}
                </span>
              )}
            </div>

            <Button type="submit" fullWidth={true}>
              sign up
            </Button>
          </form>

          <p className="text-center text-sm text-gray-500">
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
