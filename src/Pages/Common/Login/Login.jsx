import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "../../../Components/Button";
import { RegisterPageLayout } from "../../../Layouts/RegisterPageLayout";
import { userLogin } from "../../../Redux/Feature/auth/authAction";
import { loginValidator } from "../../../utils/dataValidator";
import InputField from "../../../Components/FormComponents/InputField";

// Tailwind Class Name
const tailwindClass = {
  box: "max-w-lg mx-auto border border-solid rounded-lg shadow grid gap-5 align-center p-6 lg:px-8",
  links: `font-semibold capitalize ml-1 leading-6 text-orange-600 hover:text-orange-500`,
  title: "text-center text-2xl font-bold leading-9 tracking-tight text-gray-900",
  error: "text-red-600 text-sm",
  footerPara: "text-center text-sm text-gray-500",
};

export default function Login() {
  // using Hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // States
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });
  const error = useSelector((state) => state.auth.error);
  const [showPassword, setShowPassword] = React.useState(false);
  const [errors, setErrors] = React.useState({
    email: "",
    password: "",
  });
  const [isFormSubmitted, setFormSubmitted] = React.useState(false);
  let isFormValid = true;

  // State handling Functions
  const inputChangeHandler = (e) => {
    setFormData((prevFormData) => {
      return { ...prevFormData, [e.target.name]: e.target.value };
    });
  };

  const showPasswordInput = () => {
    setShowPassword(!showPassword);
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
        <h2 className={tailwindClass.title}>Sign in to your account</h2>

        <div className="grid gap-5 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="grid gap-4" method="POST" onSubmit={formSubmitHandler}>
            <InputField
              id="email"
              label="Email address"
              error={error || errors.email}
              name="email"
              type="email"
              value={formData.email}
              onChange={inputChangeHandler}
              autoComplete="email"
            />

            <InputField
              id="password"
              label="Password"
              error={error || errors.password}
              name="password"
              type="password"
              value={formData.password}
              onChange={inputChangeHandler}
              autoComplete="current-password"
              showPassword={showPassword}
              showPasswordFunc={showPasswordInput}
            >
              <Link to="/confirm-email" className={`${tailwindClass.links} text-sm`}>
                Forgot password?
              </Link>
            </InputField>

            {error && <span className={tailwindClass.error}>{error}</span>}
            <Button type="submit">sign in</Button>
          </form>

          <p className={tailwindClass.footerPara}>
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
