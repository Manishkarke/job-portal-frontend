const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export const registrationValidator = (
  { name, email, password, confirmPassword },
  setErrors
) => {
  // Validate userName
  if (!name.trim()) {
    setErrors((prevErrors) => {
      return { ...prevErrors, name: "Username is required" };
    });
  } else {
    setErrors((prevErrors) => {
      return { ...prevErrors, name: "" };
    });
  }

  // Validate userEmail
  if (!email.trim()) {
    setErrors((prevErrors) => {
      return { ...prevErrors, email: "Email is required" };
    });
  } else if (!email.match(emailRegex)) {
    // error.userEmail = "Email is not valid";
    setErrors((prevErrors) => {
      return { ...prevErrors, email: "Email is not valid" };
    });
  } else {
    setErrors((prevErrors) => {
      return { ...prevErrors, email: "" };
    });
  }

  // Validate userPassword
  if (!password.trim()) {
    // error.userPassword = "Password is required";
    setErrors((prevErrors) => {
      return { ...prevErrors, password: "Password is required" };
    });
  } else if (password.trim().length < 8) {
    // error.userPassword = "Password must be at least 8 character long";
    setErrors((prevErrors) => {
      return {
        ...prevErrors,
        password: "Password must be at least 8 character long",
      };
    });
  } else {
    setErrors((prevErrors) => {
      return { ...prevErrors, password: "" };
    });
  }

  // check if password and confirm password match.
  if (password !== confirmPassword) {
    setErrors((prevErrors) => {
      return { ...prevErrors, confirmPassword: "Passwords must match" };
    });
  } else if (password === confirmPassword) {
    setErrors((prevErrors) => {
      return { ...prevErrors, confirmPassword: "" };
    });
  }
};
