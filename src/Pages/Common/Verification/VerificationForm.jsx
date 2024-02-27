import React from "react";
import { getDataFromLocalStorage } from "../../../utils/localStorage";
import { useNavigate } from "react-router-dom";
import { verifyRegistration } from "../../../Redux/Feature/auth/authAction";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { OtpVerificationForm } from "../../../Components/otpVerifyForm/OtpVerificationForm";

export const VerificationForm = ({ verificationFor }) => {
  const email = getDataFromLocalStorage("email");
  const [otp, setOtp] = React.useState("");
  const error = useSelector((state) => state.auth.error);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    dispatch(verifyRegistration({ otp, email, navigate, toast }));
  };

  return (
    <>
      <OtpVerificationForm verificationFor={verificationFor} />
    </>
  );
};
