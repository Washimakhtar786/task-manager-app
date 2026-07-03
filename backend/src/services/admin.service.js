import { User, Task } from "../domain/index.js";
import AppError from "../errors/app-error.js";

import { createSafeUserResponse } from "../utils/user-response.js";
import { createSafeTaskResponse } from "../utils/task-response.js";

export async function getAllUsers() {
  const users = await User.findAll({
    order: [["createdAt", "DESC"]]
  });

  return users.map(createSafeUserResponse);
}

export async function getAllTasks() {
  const tasks = await Task.findAll({
    include: [
      {
        model: User,
        as: "user",
        attributes: [
          "id",
          "name",
          "email",
          "role",
          "isActive"
        ]
      }
    ],
    order: [["createdAt", "DESC"]]
  });

  return tasks.map((task) => ({
    ...createSafeTaskResponse(task),
    user: task.user
      ? {
          id: task.user.id,
          name: task.user.name,
          email: task.user.email,
          role: task.user.role,
          isActive: task.user.isActive
        }
      : null
  }));
}

export async function getAdminStatistics() {
  const [
    totalUsers,
    activeUsers,
    inactiveUsers,
    totalTasks,
    pendingTasks,
    completedTasks
  ] = await Promise.all([
    User.count(),
    User.count({
      where: {
        isActive: true
      }
    }),
    User.count({
      where: {
        isActive: false
      }
    }),
    Task.count(),
    Task.count({
      where: {
        status: "PENDING"
      }
    }),
    Task.count({
      where: {
        status: "COMPLETED"
      }
    })
  ]);

  return {
    totalUsers,
    activeUsers,
    inactiveUsers,
    totalTasks,
    pendingTasks,
    completedTasks
  };
}

export async function updateUserStatus({
  adminUserId,
  targetUserId,
  isActive
}) {
  if (adminUserId === targetUserId && !isActive) {
    throw new AppError(
      "You cannot deactivate your own administrator account",
      400
    );
  }

  const user = await User.findByPk(targetUserId);

  if (!user) {
    throw new AppError(
      "User not found",
      404
    );
  }

  if (user.isActive === isActive) {
    return createSafeUserResponse(user);
  }

  await user.update({
    isActive
  });

  return createSafeUserResponse(user);
}