const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const passwordRegex =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// Registration form validator
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
  }
  // else if (!password.match(passwordRegex)) {
  //   setErrors((prevErrors) => {
  //     return {
  //       ...prevErrors,
  //       password: "Password must have atleast one spacial character",
  //     };
  //   });
  // }
  else {
    setErrors((prevErrors) => {
      return { ...prevErrors, password: "" };
    });
  }

  // check if password and confirm password match.
  if (password !== confirmPassword) {
    console.log("Password and confirm password are not the same");
    setErrors((prevErrors) => {
      return { ...prevErrors, confirmPassword: "Passwords must match" };
    });
    console.log(
      "PASSWORD: " + password + " confirm password: " + confirmPassword
    );
  } else if (password === confirmPassword) {
    console.log("confirmed passwords match");
    setErrors((prevErrors) => {
      return { ...prevErrors, confirmPassword: "" };
    });
  }
};

// TODO: Changess starts here

// log in form validator
export const loginValidator = ({ email, password }, setErrors) => {
  if (!email.trim()) {
    setErrors((prevErrors) => {
      return { ...prevErrors, email: "Email is required" };
    });
  } else if (!email.match(emailRegex)) {
    setErrors((prevErrors) => {
      return { ...prevErrors, email: "Email is not valid" };
    });
  } else {
    setErrors((prevErrors) => {
      return { ...prevErrors, email: "" };
    });
  }

  if (!password.trim()) {
    setErrors((prevErrors) => {
      return { ...prevErrors, password: "Password is required" };
    });
  } else {
    setErrors((prevErrors) => {
      return { ...prevErrors, password: "" };
    });
  }
};

export const vendorRegistrationValidator = (
  { designation, service, contact, address },
  setErrors
) => {
  if (!designation.trim()) {
    setErrors((prevErrors) => {
      return { ...prevErrors, designation: "Designation is required" };
    });
  } else {
    setErrors((prevErrors) => {
      return { ...prevErrors, designation: "" };
    });
  }

  if (!service.trim()) {
    setErrors((prevErrors) => {
      return { ...prevErrors, service: "Service is required" };
    });
  } else {
    setErrors((prevErrors) => {
      return { ...prevErrors, service: "" };
    });
  }

  if (!contact.trim()) {
    setErrors((prevErrors) => {
      return { ...prevErrors, contact: "Contact is required" };
    });
  } else {
    setErrors((prevErrors) => {
      return { ...prevErrors, contact: "" };
    });
  }

  if (!address.trim()) {
    setErrors((prevErrors) => {
      return { ...prevErrors, address: "Address is required" };
    });
  } else {
    setErrors((prevErrors) => {
      return { ...prevErrors, address: "" };
    });
  }
};
