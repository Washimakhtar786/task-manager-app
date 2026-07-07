import axios from "axios";

import {
  clearAuthStorage,
  getStoredToken,
} from "../utils/storage.js";

// Custom browser event
export const AUTH_LOGOUT_EVENT =
  "task-manager-auth-logout";

const apiClient = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL,

  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = getStoredToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
apiClient.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response?.status === 401) {
      // Remove token and user
      clearAuthStorage();

      // Tell entire React app that logout happened
      window.dispatchEvent(
        new Event(AUTH_LOGOUT_EVENT)
      );
    }

    return Promise.reject(error);
  }
);

export default apiClient;