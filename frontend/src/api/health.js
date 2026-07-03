import apiClient from "./apiClient.js";

export async function getHealthStatus() {
  const response = await apiClient.get("/health");

  return response.data;
}