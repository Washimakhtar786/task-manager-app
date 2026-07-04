import { Navigate, Outlet } from "react-router-dom";

import Loader from "../common/Loader.jsx";
import { useAuth } from "../../context/AuthContext.jsx";

export default function AdminRoute() {
  const {
    loading,
    isAuthenticated,
    isAdmin,
    user,
  } = useAuth();

  console.log("loading =", loading);
  console.log("user =", user);
  console.log("isAuthenticated =", isAuthenticated);
  console.log("isAdmin =", isAdmin);

  if (loading) {
    return (
      <Loader message="Checking permissions..." />
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

  if (!isAdmin) {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  return <Outlet />;
}