import { User } from "../domain/index.js";
import AppError from "../errors/app-error.js";
import { createSafeUserResponse } from "../utils/user-response.js";

export async function getMyProfile(userId) {
  const user = await User.findByPk(userId);

  if (!user) {
    throw new AppError(
      "User profile could not be found",
      404
    );
  }

  return createSafeUserResponse(user);
}