const ALLOWED_TASK_STATUSES = ["PENDING", "COMPLETED"];

function isString(value) {
  return typeof value === "string";
}

function isValidDateOnly(value) {
  if (!isString(value)) {
    return false;
  }

  const datePattern = /^\d{4}-\d{2}-\d{2}$/;

  if (!datePattern.test(value)) {
    return false;
  }

  const parsedDate = new Date(`${value}T00:00:00.000Z`);

  if (Number.isNaN(parsedDate.getTime())) {
    return false;
  }

  return parsedDate.toISOString().slice(0, 10) === value;
}

export function validateCreateTaskData(data = {}) {
  const errors = {};

  const title = isString(data.title)
    ? data.title.trim()
    : "";

  const description =
    data.description === undefined ||
    data.description === null ||
    data.description === ""
      ? null
      : isString(data.description)
      ? data.description.trim()
      : "";

  const dueDate =
    data.dueDate === undefined ||
    data.dueDate === null ||
    data.dueDate === ""
      ? null
      : data.dueDate;

  const status =
    data.status === undefined ||
    data.status === null ||
    data.status === ""
      ? "PENDING"
      : isString(data.status)
      ? data.status.trim().toUpperCase()
      : "";

  if (!title) {
    errors.title = "Task title is required";
  } else if (title.length < 2) {
    errors.title =
      "Task title must contain at least 2 characters";
  } else if (title.length > 200) {
    errors.title =
      "Task title must not contain more than 200 characters";
  }

  if (
    data.description !== undefined &&
    data.description !== null &&
    data.description !== "" &&
    !isString(data.description)
  ) {
    errors.description =
      "Task description must be text";
  } else if (
    isString(description) &&
    description.length > 2000
  ) {
    errors.description =
      "Task description must not contain more than 2000 characters";
  }

  if (
    dueDate !== null &&
    !isValidDateOnly(dueDate)
  ) {
    errors.dueDate =
      "Due date must be a valid date in YYYY-MM-DD format";
  }

  if (
    !ALLOWED_TASK_STATUSES.includes(status)
  ) {
    errors.status =
      "Status must be either PENDING or COMPLETED";
  }

  if (
    Object.prototype.hasOwnProperty.call(
      data,
      "userId"
    )
  ) {
    errors.userId =
      "Task owner cannot be provided in the request";
  }

  return {
    isValid:
      Object.keys(errors).length === 0,
    errors,
    data: {
      title,
      description,
      dueDate,
      status,
    },
  };
}

export function validateUpdateTaskData(
  data = {}
) {
  const errors = {};
  const cleanedData = {};

  const allowedFields = [
    "title",
    "description",
    "status",
    "dueDate",
  ];

  const receivedFields =
    Object.keys(data);

  if (receivedFields.length === 0) {
    errors.request =
      "Provide at least one field to update";
  }

  for (const field of receivedFields) {
    if (!allowedFields.includes(field)) {
      errors[field] =
        `${field} cannot be updated`;
    }
  }

  if (
    Object.prototype.hasOwnProperty.call(
      data,
      "title"
    )
  ) {
    const title = isString(data.title)
      ? data.title.trim()
      : "";

    if (!title) {
      errors.title =
        "Task title is required";
    } else if (title.length < 2) {
      errors.title =
        "Task title must contain at least 2 characters";
    } else if (title.length > 200) {
      errors.title =
        "Task title must not contain more than 200 characters";
    } else {
      cleanedData.title = title;
    }
  }

  if (
    Object.prototype.hasOwnProperty.call(
      data,
      "description"
    )
  ) {
    if (
      data.description === null ||
      data.description === ""
    ) {
      cleanedData.description = null;
    } else if (
      !isString(data.description)
    ) {
      errors.description =
        "Task description must be text";
    } else {
      const description =
        data.description.trim();

      if (description.length > 2000) {
        errors.description =
          "Task description must not contain more than 2000 characters";
      } else {
        cleanedData.description =
          description || null;
      }
    }
  }

  if (
    Object.prototype.hasOwnProperty.call(
      data,
      "status"
    )
  ) {
    const status = isString(data.status)
      ? data.status.trim().toUpperCase()
      : "";

    if (
      !ALLOWED_TASK_STATUSES.includes(
        status
      )
    ) {
      errors.status =
        "Status must be either PENDING or COMPLETED";
    } else {
      cleanedData.status = status;
    }
  }

  if (
    Object.prototype.hasOwnProperty.call(
      data,
      "dueDate"
    )
  ) {
    if (
      data.dueDate === null ||
      data.dueDate === ""
    ) {
      cleanedData.dueDate = null;
    } else if (
      !isValidDateOnly(data.dueDate)
    ) {
      errors.dueDate =
        "Due date must be a valid date in YYYY-MM-DD format";
    } else {
      cleanedData.dueDate =
        data.dueDate;
    }
  }

  return {
    isValid:
      Object.keys(errors).length === 0,
    errors,
    data: cleanedData,
  };
}

export { ALLOWED_TASK_STATUSES };