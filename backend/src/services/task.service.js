import { Task } from "../domain/index.js";

function createSafeTaskResponse(task) {
  return {
    id: task.id,
    title: task.title,
    description: task.description,
    status: task.status,
    dueDate: task.dueDate,
    userId: task.userId,
    createdAt: task.createdAt,
    updatedAt: task.updatedAt
  };
}

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