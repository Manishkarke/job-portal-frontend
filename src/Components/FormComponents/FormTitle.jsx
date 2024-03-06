import React from "react";
const tailwindCLass = {
  title: "text-2xl font-bold leading-snug capitalize",
  message: "font-medium flex flex-col jusfify-center w-3/4 mx-auto",
};
const FormTitle = ({ title, message }) => {
  return (
    <>
      <h2 className={tailwindCLass.title}>{title}</h2>
      {(message && <p className={tailwindCLass.message}>{message}</p>) || null}
    </>
  );
};

export default FormTitle;
