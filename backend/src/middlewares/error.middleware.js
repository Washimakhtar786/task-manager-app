import {
  ValidationError,
  UniqueConstraintError,
  ForeignKeyConstraintError,
} from "sequelize";

import env from "../config/env.js";
import { sendError } from "../utils/response.js";

function formatSequelizeValidationErrors(error) {
  const errors = {};

  for (const errorItem of error.errors || []) {
    const field = errorItem.path || "request";

    if (!errors[field]) {
      errors[field] = errorItem.message;
    }
  }

  return errors;
}

export function errorMiddleware(error, req, res, next) {
  console.error(error);

  if (error instanceof UniqueConstraintError) {
    const errors = formatSequelizeValidationErrors(error);

    return sendError(res, {
      statusCode: 409,
      message: "A record with the provided value already exists",
      errors,
    });
  }

  if (error instanceof ValidationError) {
    const errors = formatSequelizeValidationErrors(error);

    return sendError(res, {
      statusCode: 400,
      message: "Database validation failed",
      errors,
    });
  }

  if (error instanceof ForeignKeyConstraintError) {
    return sendError(res, {
      statusCode: 400,
      message: "The related record does not exist",
    });
  }

  if (error.type === "entity.parse.failed") {
    return sendError(res, {
      statusCode: 400,
      message: "Request body contains invalid JSON",
    });
  }

  if (error.isOperational) {
    return sendError(res, {
      statusCode: error.statusCode || 500,
      message: error.message,
      errors: error.errors,
    });
  }

  return sendError(res, {
    statusCode: 500,
    message:
      env.nodeEnv === "development"
        ? error.message
        : "Internal server error",
  });
}