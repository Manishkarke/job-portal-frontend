import React from "react";
import { Button } from "../../Components/Button";

export const PageNotFound = () => {
  return (
    <section className="h-screen grid place-content-center text-center capitalize">
      <h1 className="text-9xl font-bold leading-normal text-orange-400">
        oops!
      </h1>
      <p className="text-2xl leading-normal font-medium">
        404 - page not found
      </p>
      <Button type="button" navigateTo="/" customization="mt-4">
        Back to homepage
      </Button>
    </section>
  );
};
