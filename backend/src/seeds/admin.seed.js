import { User } from "../domain/index.js";
import env from "../config/env.js";
import { hashPassword } from "../utils/password.js";

export async function seedAdminUser() {
  const existingAdmin = await User.findOne({
    where: {
      email: env.admin.email
    }
  });

  if (existingAdmin) {
    if (existingAdmin.role !== "ADMIN") {
      await existingAdmin.update({
        role: "ADMIN",
        isActive: true
      });

      console.log(
        `Existing user promoted to ADMIN: ${env.admin.email}`
      );
    } else {
      console.log(
        `Admin user already exists: ${env.admin.email}`
      );
    }

    return;
  }

  const hashedPassword = await hashPassword(
    env.admin.password
  );

  await User.create({
    name: env.admin.name,
    email: env.admin.email,
    password: hashedPassword,
    role: "ADMIN",
    isActive: true
  });

  console.log(
    `Admin user created successfully: ${env.admin.email}`
  );
}