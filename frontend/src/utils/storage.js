const TOKEN_KEY = "task_manager_token";

const USER_KEY = "task_manager_user";

export function getStoredToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function storeToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function removeStoredToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export function getStoredUser() {
  const storedUser = localStorage.getItem(USER_KEY);

  if (!storedUser) {
    return null;
  }

  try {
    return JSON.parse(storedUser);
  } catch {
    removeStoredUser();
    return null;
  }
}

export function storeUser(user) {
  localStorage.setItem(
    USER_KEY,
    JSON.stringify(user)
  );
}

export function removeStoredUser() {
  localStorage.removeItem(USER_KEY);
}

export function clearAuthStorage() {
  removeStoredToken();
  removeStoredUser();
}