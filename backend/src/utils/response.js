export function sendSuccess(
  res,
  {
    statusCode = 200,
    message = "Request completed successfully",
    data = null,
  } = {}
) {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
}

export function sendError(
  res,
  {
    statusCode = 500,
    message = "Internal server error",
    errors,
  } = {}
) {
  const response = {
    success: false,
    message,
  };

  if (errors) {
    response.errors = errors;
  }

  return res.status(statusCode).json(response);
}