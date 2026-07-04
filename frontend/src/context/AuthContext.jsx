import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  getCurrentProfile,
  loginAccount,
  registerAccount,
} from "../api/authApi.js";

import {
  clearAuthStorage,
  getStoredToken,
  removeStoredToken,
  storeToken,
  storeUser,
} from "../utils/storage.js";

const AuthContext = createContext(null);

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used within an AuthProvider"
    );
  }

  return context;
}

export function AuthProvider({
  children,
}) {
  const [user, setUser] = useState(null);

  const [loading, setLoading] =
    useState(true);


    useEffect(() => {
  async function restoreSession() {
    const token = getStoredToken();

    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const profile =
        await getCurrentProfile();

      storeUser(profile);

      setUser(profile);
    } catch (error) {
      clearAuthStorage();

      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  restoreSession();
}, []);



async function login(formData) {
  const data = await loginAccount(formData);

  storeToken(data.token);

  storeUser(data.user);

  setUser(data.user);

  return data.user;
}

async function register(formData) {
  const user = await registerAccount(formData);

  return user;
}

function logout() {
  clearAuthStorage();
  setUser(null);
}

console.log("AuthContext", {
  user,
  loading,
  isAuthenticated: Boolean(user),
  role: user?.role,
  isAdmin: user?.role === "ADMIN",
});

  const value = useMemo(
    () => ({
      user,

      loading,

      isAuthenticated:
        Boolean(user),

      isAdmin:
        user?.role === "ADMIN",

      setUser,

      setLoading,
      login,
      register,
      logout,

    }),
    [user, loading]
  );

  return (
    <AuthContext.Provider
      value={value}
    >
      {children}
    </AuthContext.Provider>
  );
}



export default AuthContext;