import {
  getAllUsers,
  getAllTasks,
  getAdminStatistics,
  updateUserStatus
} from "../services/admin.service.js";

import { sendSuccess } from "../utils/response.js";

export async function listUsers(req, res) {
  const users = await getAllUsers();

  return sendSuccess(res, {
    statusCode: 200,
    message: "Users retrieved successfully",
    data: {
      users,
      total: users.length
    }
  });
}

export async function listTasks(req, res) {
  const tasks = await getAllTasks();

  return sendSuccess(res, {
    statusCode: 200,
    message: "Tasks retrieved successfully",
    data: {
      tasks,
      total: tasks.length
    }
  });
}

export async function getStatistics(req, res) {
  const statistics = await getAdminStatistics();

  return sendSuccess(res, {
    statusCode: 200,
    message: "Statistics retrieved successfully",
    data: {
      statistics
    }
  });
}

export async function changeUserStatus(req, res) {
  const user = await updateUserStatus({
    adminUserId: req.user.id,
    targetUserId: req.targetUserId,
    isActive: req.validatedData.isActive
  });

  return sendSuccess(res, {
    statusCode: 200,
    message: user.isActive
      ? "User activated successfully"
      : "User deactivated successfully",
    data: {
      user
    }
  });
}