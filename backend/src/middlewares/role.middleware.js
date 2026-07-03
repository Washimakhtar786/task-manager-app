import AppError from "../errors/app-error.js";

export function authorizeRoles(...allowedRoles) {
  return function roleAuthorizationMiddleware(
    req,
    res,
    next
  ) {
    if (!req.user) {
      return next(
        new AppError(
          "Authentication is required before role authorization",
          401
        )
      );
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(
        new AppError(
          "You are not authorized to access this resource",
          403
        )
      );
    }

    next();
  };
}