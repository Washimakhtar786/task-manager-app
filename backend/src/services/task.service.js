import { Task } from "../domain/index.js";
import AppError from "../errors/app-error.js";
import { createSafeTaskResponse } from "../utils/task-response.js";



export async function createTask({
  userId,
  title,
  description,
  dueDate
}) {
  const task = await Task.create({
    userId,
    title,
    description,
    dueDate,
    status: "PENDING"
  });

  return createSafeTaskResponse(task);
}

export async function getUserTasks({
  userId,
  status
}) {
  const whereCondition = {
    userId
  };

  if (status) {
    whereCondition.status = status;
  }

  const tasks = await Task.findAll({
    where: whereCondition,
    order: [["createdAt", "DESC"]]
  });

  return tasks.map(createSafeTaskResponse);
}

export async function getTaskById({
  taskId,
  userId
}) {
  const task = await Task.findByPk(taskId);

  if (!task) {
    throw new AppError(
      "Task not found",
      404
    );
  }

  if (task.userId !== userId) {
    throw new AppError(
      "You do not have permission to access this task",
      403
    );
  }

  return createSafeTaskResponse(task);
}

export async function updateTask({
  taskId,
  userId,
  updates
}) {
  const task = await Task.findByPk(taskId);

  if (!task) {
    throw new AppError(
      "Task not found",
      404
    );
  }

  if (task.userId !== userId) {
    throw new AppError(
      "You do not have permission to modify this task",
      403
    );
  }

  await task.update(updates);

  return createSafeTaskResponse(task);
}

export async function deleteTask({
  taskId,
  userId
}) {
  const task = await Task.findByPk(taskId);

  if (!task) {
    throw new AppError(
      "Task not found",
      404
    );
  }

  if (task.userId !== userId) {
    throw new AppError(
      "You do not have permission to delete this task",
      403
    );
  }

  await task.destroy();

  return;
}