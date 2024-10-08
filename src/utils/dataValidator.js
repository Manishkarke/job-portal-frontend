const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

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
  } else if (!password.match(/[A-Z]/)) {
    // Check if password contains a uppercase letter
    setErrors((prevErrors) => {
      return {
        ...prevErrors,
        password: "Password must have atleast one uppercase letter",
      };
    });
  } else if (!password.match(/[a-z]/)) {
    // above condition check if password contains a lowercase letter
    setErrors((prevErrors) => {
      return {
        ...prevErrors,
        password: "Password must have atleast one lowercase letter",
      };
    });
  } else if (!password.match(/[0-9]/)) {
    // above condition check if password contains any numbers
    setErrors((prevErrors) => {
      return {
        ...prevErrors,
        password: "Password must have atleast one digit",
      };
    });
  } else {
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

// log in form validator
export const loginValidator = ({ email, password }, setErrors) => {
  if (!email?.trim()) {
    setErrors((prevErrors) => {
      return { ...prevErrors, email: "Email is required" };
    });
  } else if (!email?.match(emailRegex)) {
    setErrors((prevErrors) => {
      return { ...prevErrors, email: "Email is not valid" };
    });
  } else {
    setErrors((prevErrors) => {
      return { ...prevErrors, email: "" };
    });
  }

  if (!password?.trim()) {
    setErrors((prevErrors) => {
      return { ...prevErrors, password: "Password is required" };
    });
  } else {
    setErrors((prevErrors) => {
      return { ...prevErrors, password: "" };
    });
  }
};

// Vendor Registration Data Validator
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

// Category Form data validator
export const categoryFormValidation = ({ category, image }, setErrors) => {
  if (!category.trim())
    setErrors((prevErrors) => {
      return { ...prevErrors, category: "Category is required" };
    });
  else
    setErrors((prevErrors) => {
      return { ...prevErrors, category: "" };
    });

  // Checking if there is a image or not
  if (!image)
    setErrors((prevErrors) => {
      return { ...prevErrors, image: "Image is required" };
    });
  else
    setErrors((prevErrors) => {
      return { ...prevErrors, image: "" };
    });
};

// Reset Password's data validator
export const resetPasswordValidation = (
  { password, confirmPassword },
  setErrors
) => {
  if (!password.trim()) {
    setErrors((prevErrors) => {
      return { ...prevErrors, password: "Password is required." };
    });
  } else if (!password.match(/[A-Z]/)) {
    setErrors((prevErrors) => {
      return {
        ...prevErrors,
        password: "Atleast one uppercase letter is required.",
      };
    });
  } else if (!password.match(/[a-z]/)) {
    setErrors((prevErrors) => {
      return {
        ...prevErrors,
        password: "Atleast one lowercase letter is required.",
      };
    });
  } else if (!password.match(/[0-9]/)) {
    setErrors((prevErrors) => {
      return { ...prevErrors, password: "Atleast one number is required." };
    });
  } else {
    setErrors((prevErrors) => {
      return { ...prevErrors, password: "" };
    });
  }

  if (password !== confirmPassword) {
    setErrors((prevErrors) => {
      return { ...prevErrors, confirmPassword: "Passwords did not match." };
    });
  } else {
    setErrors((prevErrors) => {
      return { ...prevErrors, confirmPassword: "" };
    });
  }
};

// Create job data validator
export const createJobValidation = (
  { title, description, location, salary, deadline, categoryId },
  setErrors
) => {
  // Title validation
  if (!title || !title.trim()) {
    setErrors((prevErrors) => {
      return { ...prevErrors, title: "Title is required" };
    });
  } else if (!title.match(/^[a-zA-Z\s]+$/)) {
    setErrors((prevErrors) => {
      return { ...prevErrors, title: "Title is invalid" };
    });
  } else {
    setErrors((prevErrors) => {
      return { ...prevErrors, title: "" };
    });
  }

  // Description validation
  if (!description || !description.trim()) {
    setErrors((prevErrors) => {
      return { ...prevErrors, description: "Description is required" };
    });
  } else {
    setErrors((prevErrors) => {
      return { ...prevErrors, description: "" };
    });
  }

  // Location validation
  if (!location || !location.trim()) {
    setErrors((prevErrors) => {
      return { ...prevErrors, location: "Location is required" };
    });
  } else {
    setErrors((prevErrors) => {
      return { ...prevErrors, location: "" };
    });
  }

  // salary validation
  if (!salary) {
    setErrors((prevErrors) => {
      return { ...prevErrors, salary: "Salary is required" };
    });
  } else {
    setErrors((prevErrors) => {
      return { ...prevErrors, salary: "" };
    });
  }

  // deadline validation
  if (!deadline) {
    setErrors((prevErrors) => {
      return { ...prevErrors, deadline: "Deadline is required" };
    });
  } else {
    setErrors((prevErrors) => {
      return { ...prevErrors, deadline: "" };
    });
  }

  // Category id
  if (!categoryId) {
    setErrors((prevErrors) => {
      return { ...prevErrors, category: "Category is required" };
    });
  } else {
    setErrors((prevErrors) => {
      return { ...prevErrors, category: "" };
    });
  }
};
