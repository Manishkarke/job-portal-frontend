import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "../../../Components/Button";
import { RegisterPageLayout } from "../../../Layouts/RegisterPageLayout";
import { userRegister } from "../../../Redux/Feature/auth/authAction";
import { registrationValidator } from "../../../utils/dataValidator";
import InputField from "../../../Components/FormComponents/InputField";

// Tailwind Class Name
const tailwindClass = {
  box: "grid gap-5 border border-solid rounded-lg shadow flex min-h-full flex-col justify-center align-center px-6 py-6 lg:px-8",
  links: "font-semibold capitalize ml-1 leading-6 text-orange-600 hover:text-orange-500",
  title: " text-center text-2xl font-bold leading-9 tracking-tight text-gray-900",
  error: "text-red-600 text-sm",
  footerPara: "text-center text-sm text-gray-500",
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
  const showPasswordNormal = () => {
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
        {/* <div className="sm:mx-auto sm:w-full sm:max-w-sm"> */}
        <h2 className={tailwindClass.title}>Create new account</h2>
        {/* </div> */}

        <div className="grid gap-5 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="grid gap-4" method="POST" onSubmit={formSubmitHandler}>
            <InputField
              id="fullname"
              name="fullname"
              label="full name"
              type="text"
              value={formData.name}
              onChange={inputFieldChangeHandler}
              autoComplete="name"
              error={errors?.name}
            />

            <InputField
              id="email"
              label="email address"
              name="email"
              value={formData.email}
              onChange={inputFieldChangeHandler}
              autoComplete="email"
              error={errors?.email}
            />

            <InputField
              id="password"
              label="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={inputFieldChangeHandler}
              autoComplete="current-password"
              showPassword={showPassword.password}
              showPasswordFunc={showPasswordNormal}
              error={errors?.password}
            />

            <InputField
              id="confirmPassword"
              label="confirm password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={inputFieldChangeHandler}
              autoComplete="confirm-password"
              showPassword={showPassword.confirmPassword}
              showPasswordFunc={showConfirmPassword}
              error={errors?.confirmPassword}
            />

            <Button type="submit" fullWidth={true}>
              sign up
            </Button>
          </form>

          <p className={tailwindClass.footerPara}>
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
