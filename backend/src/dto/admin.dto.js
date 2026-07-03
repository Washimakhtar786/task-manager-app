export function validateUserStatusData(data = {}) {
  const errors = {};

  if (
    !Object.prototype.hasOwnProperty.call(
      data,
      "isActive"
    )
  ) {
    errors.isActive = "Account status is required";
  } else if (typeof data.isActive !== "boolean") {
    errors.isActive =
      "Account status must be true or false";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    data: {
      isActive: data.isActive
    }
  };
}