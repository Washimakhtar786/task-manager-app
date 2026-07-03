import AppError from "../errors/app-error.js";

export function validateUserId(req, res, next) {
  const userId = Number(req.params.id);

  if (!Number.isInteger(userId) || userId <= 0) {
    return next(
      new AppError(
        "User ID must be a positive integer",
        400
      )
    );
  }

  req.targetUserId = userId;

  next();
}