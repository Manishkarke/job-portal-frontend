import React from "react";
const tailwindClass = {
  formBox:
    "border border-solid rounded-lg shadow grid md:grid-cols-2 gap-x-4 gap-y-4 min-h-full px-6 py-12 lg:px-8",
  inputField:
    "block w-full p-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
  label: "block text-sm font-medium leading-6 capitalize text-gray-900",
  links:
    "font-semibold capitalize ml-1 leading-6 text-indigo-600 hover:text-indigo-500",
  button:
    "flex w-full col-span-2  max-w-52 justify-center capitalize rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
  title:
    " text-center text-2xl font-bold leading-9 tracking-tight text-gray-900",
};
export const VendorRegister = () => {
  console.log("Vendor register is running");
  return (
    <section>
      <h2 className={tailwindClass.title}>Fill up the form for registration</h2>

      <form action="POST" className={tailwindClass.formBox}>
        <div>
          <label htmlFor="name" className={tailwindClass.label}>
            name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className={tailwindClass.inputField}
          />
        </div>

        <div>
          <label htmlFor="email" className={tailwindClass.label}>
            email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className={tailwindClass.inputField}
          />
        </div>

        <div>
          <label htmlFor="designation" className={tailwindClass.label}>
            designation
          </label>
          <input
            type="text"
            name="designation"
            id="designation"
            className={tailwindClass.inputField}
          />
        </div>

        <div>
          <label htmlFor="service" className={tailwindClass.label}>
            service
          </label>
          <input
            type="text"
            name="service"
            id="service"
            className={tailwindClass.inputField}
          />
        </div>

        <div>
          <label htmlFor="contact" className={tailwindClass.label}>
            contact
          </label>
          <input
            type="text"
            name="contact"
            id="contact"
            className={tailwindClass.inputField}
          />
        </div>

        <div>
          <label htmlFor="address" className={tailwindClass.label}>
            address
          </label>
          <input
            type="text"
            name="address"
            id="address"
            className={tailwindClass.inputField}
          />
        </div>

        <button type="submit" className={tailwindClass.button}>
          register as vendor
        </button>
      </form>
    </section>
  );
};
