import React, { useState } from "react";
import { RegisterPageLayout } from "../../../Layouts/RegisterPageLayout";
import { Button } from "../../../Components/Button";
import { setDataInLocalStorage } from "../../../utils/localStorage";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { sendOtp } from "../../../Redux/Feature/auth/authAction";
import InputField from "../../../Components/FormComponents/InputField";
import FormTitle from "../../../Components/FormComponents/FormTitle";

const tailwindCLass = {
  box: "max-w-xm py-8 px-6 rounded-3xl text-center shadow-lg grid place-content-center gap-2 border border-solid",
  form: "grid gap-4 place-content-center",
  button: "w-full py-3 px-6 text-lg",
};
export const ConfirmEmail = () => {
  const [email, setEmail] = useState("");
  let error = useSelector((state) => state.auth.error);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setDataInLocalStorage("email", email);
    if (!email.trim()) {
      toast.error("this field is required.");
    } else {
      dispatch(sendOtp({ email, toast, navigate, otpFor: "reset-password" }));
    }
  };

  const inputFieldChangeHandler = (e) => {
    setEmail(e.target.value);
  };
  return (
    <RegisterPageLayout>
      <article className={tailwindCLass.box}>
        <FormTitle
          title="Forget the password"
          message="Don't worry! It happens. Please enter your email address associated with your account."
        />

        <form action="POST" className={tailwindCLass.form} onSubmit={handleFormSubmit}>
          <InputField
            type="text"
            id="email"
            name="email"
            value={email}
            onChange={inputFieldChangeHandler}
            error={error}
          />
          <Button type="submit" customization={tailwindCLass.button}>
            confirm email
          </Button>
        </form>
      </article>
    </RegisterPageLayout>
  );
};
