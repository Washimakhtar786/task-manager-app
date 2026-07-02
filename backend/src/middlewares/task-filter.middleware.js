import AppError from "../errors/app-error.js";
import { ALLOWED_TASK_STATUSES } from "../dto/task.dto.js";

export function validateTaskStatusFilter(
  req,
  res,
  next
) {
  const { status } = req.query;

  if (status === undefined) {
    req.taskStatusFilter = undefined;
    return next();
  }

  const normalizedStatus =
    typeof status === "string"
      ? status.trim().toUpperCase()
      : "";

  if (
    !ALLOWED_TASK_STATUSES.includes(
      normalizedStatus
    )
  ) {
    return next(
      new AppError(
        "Status filter must be either PENDING or COMPLETED",
        400,
        {
          status:
            "Status filter must be either PENDING or COMPLETED"
        }
      )
    );
  }

  req.taskStatusFilter = normalizedStatus;

  next();
}