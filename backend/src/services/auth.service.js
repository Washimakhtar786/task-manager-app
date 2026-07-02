import { User } from "../domain/index.js";
import AppError from "../errors/app-error.js";
import { hashPassword } from "../utils/password.js";

function createSafeUserResponse(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    isActive: user.isActive,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  };
}

export async function registerUser({
  name,
  email,
  password
}) {
  const existingUser = await User.findOne({
    where: {
      email
    }
  });

  if (existingUser) {
    throw new AppError(
      "An account with this email already exists",
      409,
      {
        email: "Email is already registered"
      }
    );
  }

  const hashedPassword = await hashPassword(password);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: "USER",
    isActive: true
  });

  return createSafeUserResponse(user);
}