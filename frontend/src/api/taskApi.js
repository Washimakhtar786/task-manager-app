import apiClient from "./apiClient.js";



export async function fetchTasks(status = "") {
  const response = await apiClient.get(
    "/tasks",
    {
      params: status
        ? {
            status,
          }
        : {},
    }
  );

  return response.data.data;
}

export async function fetchTaskById(taskId) {
  const response = await apiClient.get(
    `/tasks/${taskId}`
  );

  return response.data.data.task;
}

export async function createTask(taskData) {
  const response = await apiClient.post(
    "/tasks",
    taskData
  );

  return response.data.data.task;
}

export async function updateTask(
  taskId,
  taskData
) {
  const response = await apiClient.put(
    `/tasks/${taskId}`,
    taskData
  );

  return response.data.data.task;
}

export async function deleteTask(taskId) {
  const response = await apiClient.delete(
    `/tasks/${taskId}`
  );

  return response.data;
}