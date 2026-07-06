
import { Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/AppLayout.jsx";
import HomePage from "./pages/HomePage.jsx";

import LoginPage from "./pages/auth/LoginPage.jsx";
import RegisterPage from "./pages/auth/RegisterPage.jsx";

import TasksPage from "./pages/tasks/TasksPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

import ProtectedRoute from "./components/auth/ProtectedRoute.jsx";
import PublicOnlyRoute from "./components/auth/PublicOnlyRoute.jsx";
import AdminRoute from "./components/auth/AdminRoute.jsx";
import EditTaskPage from "./pages/tasks/EditTaskPage.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        {/* Public Route */}
        <Route
          path="/"
          element={<HomePage />}
        />

        {/* Public Only Routes */}
        <Route element={<PublicOnlyRoute />}>
          <Route
            path="/login"
            element={<LoginPage />}
          />

          <Route
            path="/register"
            element={<RegisterPage />}
          />
        </Route>

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route
            path="/tasks"
            element={<TasksPage />}
          />

           <Route
    path="/tasks/:taskId/edit"
    element={<EditTaskPage />}
  />

          <Route
            path="/profile"
            element={<ProfilePage />}
          />
        </Route>

        {/* Admin Routes */}
        <Route element={<AdminRoute />}>
          <Route
            path="/admin"
            element={<AdminDashboardPage />}
          />
        </Route>
      </Route>

      <Route
        path="*"
        element={<NotFoundPage />}
      />
    </Routes>
  );
}