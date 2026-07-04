import apiClient from "./apiClient.js";

export async function registerAccount(formData) {
  const response = await apiClient.post(
    "/auth/register",
    formData
  );

  return response.data.data;
}

export async function loginAccount(formData) {
  const response = await apiClient.post(
    "/auth/login",
    formData
  );

  return response.data.data;
}

export async function getCurrentProfile() {
  const response = await apiClient.get(
    "/auth/me"
  );

  return response.data.data;
}