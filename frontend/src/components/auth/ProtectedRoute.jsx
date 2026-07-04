import { Navigate, Outlet } from "react-router-dom";

import Loader from "../common/Loader.jsx";
import { useAuth } from "../../context/AuthContext.jsx";

export default function ProtectedRoute() {
  const {
    loading,
    isAuthenticated,
  } = useAuth();

  if (loading) {
    return (
      <Loader message="Checking authentication..." />
    );
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  return <Outlet />;
}