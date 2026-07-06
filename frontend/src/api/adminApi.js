import apiClient from "./apiClient.js";

export async function fetchAdminStatistics() {
  const response = await apiClient.get(
    "/admin/statistics"
  );

  return response.data.data.statistics;
}

export async function fetchAdminUsers() {
  const response = await apiClient.get(
    "/admin/users"
  );

  return response.data.data;
}

export async function fetchAdminTasks() {
  const response = await apiClient.get(
    "/admin/tasks"
  );

  return response.data.data;
}

export async function updateAdminUserStatus(
  userId,
  isActive
) {
  const response = await apiClient.patch(
    `/admin/users/${userId}/status`,
    {
      isActive,
    }
  );

  return response.data.data.user;
}