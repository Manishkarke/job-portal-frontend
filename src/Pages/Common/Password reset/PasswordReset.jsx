import React from "react";
import { RegisterPageLayout } from "../../../Layouts/RegisterPageLayout";
import { Button } from "../../../Components/Button";
import { useDispatch, useSelector } from "react-redux";
import { resetPasswordValidation } from "../../../utils/dataValidator";
import { useNavigate } from "react-router-dom";
import { getDataFromLocalStorage } from "../../../utils/localStorage";
import { resetPassword } from "../../../Redux/Feature/auth/authAction";
import { toast } from "react-toastify";
import InputField from "../../../Components/FormComponents/InputField";

const tailwindClass = {
  title: " text-center text-2xl font-bold leading-9 tracking-tight text-gray-900",
  box: "max-w-xm py-8 px-6 rounded-3xl text-center shadow-lg grid place-content-center gap-2 border border-solid",
  message: "font-medium flex flex-col jusfify-center w-3/4 mx-auto",
  form: "grid gap-4 place-content-center",
  button: "w-full py-3 px-6 text-lg",
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
      <article className={tailwindClass.box}>
        <h2 className={tailwindClass.title}>Reset the password</h2>
        <p className={tailwindClass.message}>
          Please Enter your new password. New password must be different from old password.
        </p>

        <form action="POST" className={tailwindClass.form} onSubmit={handleFormSubmit}>
          <InputField
            autoComplete="current-password"
            error={errors.password}
            id="password"
            label="New password"
            name="password"
            onChange={inputFieldChangeHandler}
            showPassword={showPassword.password}
            showPasswordFunc={showPasswordNormal}
            type="password"
            value={passwords.password}
          />
          <InputField
            autoComplete="confirm-password"
            error={errors.confirmPassword}
            id="confirmPassword"
            label="Repeat new password"
            name="confirmPassword"
            onChange={inputFieldChangeHandler}
            showPassword={showPassword.confirmPassword}
            showPasswordFunc={showConfirmPassword}
            type="password"
            value={passwords.confirmPassword}
          />
          <Button type="submit" customization={tailwindClass.button}>
            reset password
          </Button>
        </form>
      </article>
    </RegisterPageLayout>
  );
};
