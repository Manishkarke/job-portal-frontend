import React from "react";
import { Button } from "../Components/Button";

export const RegisterPageLayout = ({ children }) => {
  return (
    <section className="min-h-screen grid place-content-center relative ">
      <Button
        type="button"
        navigateTo="/"
        customization="absolute top-4 left-4 shadow-2xl"
      >
        home
      </Button>
      {children}
    </section>
  );
};
