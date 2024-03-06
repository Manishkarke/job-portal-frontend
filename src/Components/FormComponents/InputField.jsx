import React from "react";

const tailwindClass = {
  inputField: `block p-1.5 w-full h-9 border-solid text-gray-900 shadow-sm sm:text-sm sm:leading-6 rounded-md ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring focus:ring-indigo-600`,
  input: "h-full px-2",
  label: "block text-sm font-medium leading-6 capitalize text-gray-900",
  error: "text-red-600 text-sm",
  showPasswordIcon:
    "h-full bg-white border-l border-solid w-10 grid text-orange-600 hover:text-orange-500 place-content-center absolute top-0 right-0  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring focus:ring-indigo-600 rounded-r-md",
};

const InputField = ({
  id,
  label,
  type,
  error,
  showPassword,
  showPasswordFunc,
  onChange,
  min,
  maxLength,
  name,
  value,
  autoComplete,
  children,
}) => {
  if (type === "password")
    return (
      <div>
        {(label && (
          <div className="flex items-center justify-between">
            <label htmlFor={id} className={tailwindClass.label}>
              {label}
            </label>
            {children || null}
          </div>
        )) ||
          null}
        <div className={`${tailwindClass.inputField} flex relative`}>
          <input
            id={id}
            name={name}
            type={`${showPassword ? "text" : "password"}`}
            value={value}
            onChange={onChange}
            autoComplete={autoComplete}
            className={tailwindClass.input}
          />
          <span className={tailwindClass.showPasswordIcon} onClick={showPasswordFunc}>
            <i className={`fa-solid fa-${showPassword ? "eye-slash" : "eye"}`}></i>
          </span>
        </div>
        {error && <span className={tailwindClass.error}>{error}</span>}
      </div>
    );
  else if (type === "text-area" || type === "textarea")
    return <textarea name="name" id="" cols="30" rows="10"></textarea>;
  else
    return (
      <div>
        <label htmlFor={id} className={tailwindClass.label}>
          {label}
        </label>
        <input
          type={type}
          name={name}
          id={id}
          min={min || null}
          maxLength={maxLength || null}
          value={value}
          className={`${tailwindClass.inputField} ${error ? `ring-red-600` : ""}`}
          onChange={onChange}
        />
        {error && <span className={tailwindClass.error}>{error}</span>}
      </div>
    );
};

{
  /* <div>
              <label htmlFor="email" className={tailwindClass.label}>
                Email address
              </label>
              <div className={`${tailwindClass.inputField}`}>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={inputFieldChangeHandler}
                  autoComplete="email"
                  className={tailwindClass.input}
                />
              </div>
              {errors?.email && (
                <span className={tailwindClass.error}>{errors?.email}</span>
              )}
            </div> */
}

export default InputField;
