import React from "react";
import { Button } from "../Button";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getDataFromLocalStorage } from "../../utils/localStorage";
import { RegisterPageLayout } from "../../Layouts/RegisterPageLayout";
import {
  sendOtp,
  verifyOtp,
  verifyRegistration,
} from "../../Redux/Feature/auth/authAction";

export const OtpVerificationForm = ({ state }) => {
  const location = useLocation();
  const { verificationFor } = location.state;
  const email = getDataFromLocalStorage("email");
  const [otp, setOtp] = React.useState("");
  const error = useSelector((state) => state.auth.error);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log("verification for: ", verificationFor);

  const handleOtpSubmit = (e) => {
      e.preventDefault();
      if (verificationFor === "registration")
        dispatch(verifyRegistration({ otp, email, navigate, toast }));
      else if (verificationFor === "resetpassword")
        dispatch(verifyOtp({ email, otp, toast, navigate }));
  };
  const resendOtp = () => {
      if (verificationFor === "registration") {
        console.log("hello world from resend otp reg");
        dispatch(sendOtp({ email, navigate, toast, otpFor: "registration" }));
      } else if (verificationFor === "resetpassword") {
        console.log("hello world from resend otp reset password");
        dispatch(sendOtp({ email, navigate, toast, otpFor: "reset-password" }));
      }
  };

  return (
    <RegisterPageLayout>
      <article className="max-w-xm py-8 px-6 rounded-3xl text-center shadow-lg grid gap-2 border border-solid">
        <h2 className="text-2xl font-bold leading-snug capitalize">
          verify your email
        </h2>
        <p className="font-medium flex flex-col jusfify-center">
          Please enter the 4 digit code sent to
          <span className="text-center text-slate-700">{email}</span>
        </p>

        <form
          action="POST"
          className="grid gap-4 place-content-center"
          onSubmit={handleOtpSubmit}
        >
          <div>
            <input
              className={`border-2 ${
                error ? "border-red-600" : ""
              } text-2xl tracking-[.55em] rounded-lg max-w-40 text-center py-2 border-solid`}
              type="text"
              name="otp"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={4}
            />
            {error && (
              <span className=" mt-2 flex text-sm text-red-600 font-medium">
                {error.message}
              </span>
            )}
          </div>
          <p>
            Didn't get code yet?{" "}
            <button
              type="button"
              onClick={resendOtp}
              className="capitalize font-medium text-orange-500"
            >
              resend OTP
            </button>
          </p>
          <Button type="submit" customization="w-full py-3 px-6 text-lg">
            verify
          </Button>
        </form>
      </article>
    </RegisterPageLayout>
  );
};
