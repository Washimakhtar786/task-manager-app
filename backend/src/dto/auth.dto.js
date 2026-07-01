const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isString(value) {
  return typeof value === "string";
}

export function validateRegisterData(data = {}) {
  const errors = {};

  const name = isString(data.name) ? data.name.trim() : "";
  const email = isString(data.email)
    ? data.email.trim().toLowerCase()
    : "";
  const password = isString(data.password) ? data.password : "";

  if (!name) {
    errors.name = "Name is required";
  } else if (name.length < 2) {
    errors.name = "Name must contain at least 2 characters";
  } else if (name.length > 100) {
    errors.name = "Name must not contain more than 100 characters";
  }

  if (!email) {
    errors.email = "Email is required";
  } else if (!emailPattern.test(email)) {
    errors.email = "Please provide a valid email address";
  } else if (email.length > 150) {
    errors.email = "Email must not contain more than 150 characters";
  }

  if (!password) {
    errors.password = "Password is required";
  } else if (password.length < 6) {
    errors.password = "Password must contain at least 6 characters";
  } else if (password.length > 72) {
    errors.password = "Password must not contain more than 72 characters";
  }

  if (Object.prototype.hasOwnProperty.call(data, "role")) {
    errors.role = "Role cannot be provided during registration";
  }

  if (Object.prototype.hasOwnProperty.call(data, "isActive")) {
    errors.isActive =
      "Account status cannot be provided during registration";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    data: {
      name,
      email,
      password
    }
  };
}

export function validateLoginData(data = {}) {
  const errors = {};

  const email = isString(data.email)
    ? data.email.trim().toLowerCase()
    : "";
  const password = isString(data.password) ? data.password : "";

  if (!email) {
    errors.email = "Email is required";
  } else if (!emailPattern.test(email)) {
    errors.email = "Please provide a valid email address";
  }

  if (!password) {
    errors.password = "Password is required";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    data: {
      email,
      password
    }
  };
}