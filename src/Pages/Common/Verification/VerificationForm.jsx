import React from "react";
import { RegisterPageLayout } from "../../../Layouts/RegisterPageLayout";
import { getDataFromLocalStorage } from "../../../utils/localStorage";
import { Button } from "../../../Components/Button";
import { useNavigate } from "react-router-dom";
import { verifyEmail } from "../../../Redux/Feature/user/Auth/authAction";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

export const VerificationForm = () => {
  const email = getDataFromLocalStorage("email");
  const error = useSelector((state) => state.auth.error);
  const navigate = useNavigate();
  const [otp, setOtp] = React.useState("");

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    verifyEmail({ otp, email, navigate, toast });
    console.log("verify")
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
              className="border-2 text-2xl tracking-[.55em] rounded-lg max-w-40 text-center py-2 border-solid "
              type="text"
              name="otp"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={4}
            />
            {error && <span>{error}</span>}
          </div>
          <Button type="submit" customization="w-full py-3 px-6 text-lg">
            verify
          </Button>
        </form>
      </article>
    </RegisterPageLayout>
  );
};
