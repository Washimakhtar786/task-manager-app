import AppError from "../errors/app-error.js";

export function validateTaskId(
  req,
  res,
  next
) {
  const taskId = Number(req.params.id);

  if (
    !Number.isInteger(taskId) ||
    taskId <= 0
  ) {
    return next(
      new AppError(
        "Task ID must be a positive integer",
        400
      )
    );
  }

  req.taskId = taskId;

  next();
}