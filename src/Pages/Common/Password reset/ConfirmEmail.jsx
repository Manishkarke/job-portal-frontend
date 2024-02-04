import React, { useState } from "react";
import { RegisterPageLayout } from "../../../Layouts/RegisterPageLayout";
import { Button } from "../../../Components/Button";
import { setDataInLocalStorage } from "../../../utils/localStorage";

export const ConfirmEmail = () => {
  const [email, setEmail] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setDataInLocalStorage("email", email);
  };
  return (
    <RegisterPageLayout>
      <article className="max-w-xm py-8 px-6 rounded-3xl text-center shadow-lg grid place-content-center gap-2 border border-solid">
        <h2 className="text-2xl font-bold leading-snug capitalize">
          Forget the password
        </h2>
        <p className="font-medium flex flex-col jusfify-center w-3/4 mx-auto">
          Don't worry! It happens. Please enter your email address associated
          with your account.
        </p>

        <form
          action="POST"
          className="grid gap-4 place-content-center "
          onSubmit={handleFormSubmit}
        >
          <div>
            <input
              className="border-2 text-lg rounded-lg text-center w-full py-2 border-solid "
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {/* {error && <span>{error}</span>} */}
          </div>
          <Button type="submit" customization="w-full py-3 px-6 text-lg">
            confirm email
          </Button>
        </form>
      </article>
    </RegisterPageLayout>
  );
};
