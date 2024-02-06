import React from "react";
import { RegisterPageLayout } from "../../../Layouts/RegisterPageLayout";
import { Button } from "../../../Components/Button";
import { useDispatch, useSelector } from "react-redux";
import { resetPasswordValidation } from "../../../utils/ErrorHandler";
import { useNavigate } from "react-router-dom";
import { getDataFromLocalStorage } from "../../../utils/localStorage";
import { resetPassword } from "../../../Redux/Feature/user/Auth/authAction";
import { toast } from "react-toastify";

const tailwindClass = {
  inputField: `block p-1.5 w-full h-9 border-solid text-gray-900 shadow-sm sm:text-sm sm:leading-6 rounded-md ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring focus:ring-indigo-600`,
  input: "h-full px-2",
  label: "block text-sm font-medium leading-6 capitalize text-gray-900",
  error: "text-red-600 text-sm",
  showPasswordIcon:
    "h-full border-l border-solid w-10 grid text-orange-600 hover:text-orange-500 place-content-center absolute top-0 right-0",
  title:
    " text-center text-2xl font-bold leading-9 tracking-tight text-gray-900",
};

export const PasswordReset = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [passwords, setPasswords] = React.useState({
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = React.useState({
    password: false,
    confirmPassword: false,
  });

  // Error handler
  const [errors, setErrors] = React.useState({});
  let isFormValid = true;
  const [isFormSubmitted, setFormSubmitted] = React.useState(false);

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

  const inputFieldChangeHandler = (e) => {
    setPasswords((prevPasswords) => {
      return { ...prevPasswords, [e.target.name]: e.target.value };
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    resetPasswordValidation(passwords, setErrors);
    setFormSubmitted(true);
  };

  React.useEffect(() => {
    for (const error in errors) {
      if (errors[error]) {
        isFormValid = false;
        break;
      }
    }

    if (isFormSubmitted && isFormValid) {
      const otp = getDataFromLocalStorage("otp");
      const email = getDataFromLocalStorage("email");
      const { password } = passwords;
      dispatch(resetPassword({ email, otp, password, navigate, toast }));
    }
    if (isFormSubmitted) {
      setFormSubmitted(false);
    }
  }, [isFormSubmitted, isFormValid]);
  return (
    <RegisterPageLayout>
      <article className="max-w-xm py-8 px-6 rounded-3xl text-center shadow-lg grid place-content-center gap-2 border border-solid">
        <h2 className={tailwindClass.title}>Reset the password</h2>
        <p className="font-medium flex flex-col jusfify-center w-3/4 mx-auto">
          Please Enter your new password. New password must be different from
          old password.
        </p>

        <form
          action="POST"
          className="grid gap-4 place-content-center "
          onSubmit={handleFormSubmit}
        >
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className={tailwindClass.label}>
                New password
              </label>
            </div>
            <div className={`${tailwindClass.inputField} flex relative`}>
              <input
                id="password"
                name="password"
                type={`${showPassword.password ? "text" : "password"}`}
                value={passwords.password}
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
              <label htmlFor="confirmPassword" className={tailwindClass.label}>
                Repeat new password
              </label>
            </div>
            <div className={`${tailwindClass.inputField} flex relative`}>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={`${showPassword.confirmPassword ? "text" : "password"}`}
                value={passwords.confirmPassword}
                onChange={inputFieldChangeHandler}
                autoComplete="confirm-password"
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
          <Button type="submit" customization="w-full py-3 px-6 text-lg">
            reset password
          </Button>
        </form>
      </article>
    </RegisterPageLayout>
  );
};
