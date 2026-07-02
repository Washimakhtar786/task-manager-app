import jwt from "jsonwebtoken";

import { User } from "../domain/index.js";
import AppError from "../errors/app-error.js";
import { verifyToken } from "../utils/jwt.js";

export async function authenticate(req, res, next) {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      return next(
        new AppError(
          "Authentication token is required",
          401
        )
      );
    }

    const [scheme, token] = authorizationHeader.split(" ");

    if (scheme !== "Bearer" || !token) {
      return next(
        new AppError(
          "Authorization header must use the Bearer token format",
          401
        )
      );
    }

    const decodedToken = verifyToken(token);

    const user = await User.findByPk(decodedToken.id);

    if (!user) {
      return next(
        new AppError(
          "User associated with this token no longer exists",
          401
        )
      );
    }

    if (!user.isActive) {
      return next(
        new AppError(
          "Your account has been deactivated. Contact the administrator.",
          403
        )
      );
    }

    req.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      isActive: user.isActive
    };

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return next(
        new AppError(
          "Authentication token has expired. Please log in again.",
          401
        )
      );
    }

    if (error instanceof jwt.JsonWebTokenError) {
      return next(
        new AppError(
          "Authentication token is invalid",
          401
        )
      );
    }

    next(error);
  }
}