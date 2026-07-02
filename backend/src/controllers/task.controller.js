import {
  createTask,
  getUserTasks
} from "../services/task.service.js";

import { sendSuccess } from "../utils/response.js";

export async function createMyTask(req, res) {
  const task = await createTask({
    userId: req.user.id,
    ...req.validatedData
  });

  return sendSuccess(res, {
    statusCode: 201,
    message: "Task created successfully",
    data: {
      task
    }
  });
}

export async function getMyTasks(req, res) {
  const tasks = await getUserTasks({
    userId: req.user.id,
    status: req.taskStatusFilter
  });

  return sendSuccess(res, {
    statusCode: 200,
    message: "Tasks retrieved successfully",
    data: {
      tasks,
      total: tasks.length
    }
  });
}