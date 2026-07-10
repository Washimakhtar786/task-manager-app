import { useEffect, useState } from "react";

import {
  fetchAdminStatistics,
  fetchAdminUsers,
  fetchAdminTasks,
  updateAdminUserStatus,
} from "../../api/adminApi.js";

import PageHeader from "../../components/common/PageHeader.jsx";
import Loader from "../../components/common/Loader.jsx";
import Message from "../../components/common/Message.jsx";

import AdminStatCard from "../../components/admin/AdminStatCard.jsx";
import AdminNavigation from "../../components/admin/AdminNavigation.jsx";
import UserStatusBadge from "../../components/admin/UserStatusBadge.jsx";
import DashboardLayout from "../../components/layout/DashboardLayout.jsx";

export default function AdminDashboardPage() {
  const [statistics, setStatistics] = useState(null);

  const [users, setUsers] = useState([]);

  const [tasks, setTasks] = useState([]);

  const [activeTab, setActiveTab] =
    useState("dashboard");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [updatingUser, setUpdatingUser] =
    useState(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      setLoading(true);

      setError("");

      const [
        statistics,
        usersData,
        tasksData,
      ] = await Promise.all([
        fetchAdminStatistics(),
        fetchAdminUsers(),
        fetchAdminTasks(),
      ]);

      setStatistics(statistics);

      setUsers(usersData.users);

      setTasks(tasksData.tasks);
    } catch (error) {
      console.log(error);

      setError(
        "Failed to load dashboard."
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleUserStatus(user) {
    try {
      setUpdatingUser(user.id);

      setError("");

      await updateAdminUserStatus(
        user.id,
        !user.isActive
      );

      await loadDashboard();
    } catch (error) {
      console.log(error);

      setError(
        "Failed to update user status."
      );
    } finally {
      setUpdatingUser(null);
    }
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <DashboardLayout>
      <PageHeader
        title="Admin Dashboard"
        description="Manage users and tasks."
      />

      <AdminNavigation
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      {error && (
        <Message type="error">
          {error}
        </Message>
      )}

      {activeTab === "dashboard" &&
        statistics && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <AdminStatCard
              title="Total Users"
              value={statistics.totalUsers}
              color="blue"
            />

            <AdminStatCard
              title="Active Users"
              value={statistics.activeUsers}
              color="green"
            />

            <AdminStatCard
              title="Inactive Users"
              value={statistics.inactiveUsers}
              color="red"
            />

            <AdminStatCard
              title="Total Tasks"
              value={statistics.totalTasks}
              color="indigo"
            />

            <AdminStatCard
              title="Pending Tasks"
              value={statistics.pendingTasks}
              color="yellow"
            />

            <AdminStatCard
              title="Completed Tasks"
              value={statistics.completedTasks}
              color="green"
            />
          </div>
        )}

      {activeTab === "users" && (
  <>
    {/* Desktop Table */}

    <div className="hidden md:block rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">
                Name
              </th>

              <th className="px-6 py-3 text-left text-sm font-semibold">
                Email
              </th>

              <th className="px-6 py-3 text-left text-sm font-semibold">
                Role
              </th>

              <th className="px-6 py-3 text-left text-sm font-semibold">
                Status
              </th>

              <th className="px-6 py-3 text-left text-sm font-semibold">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-t hover:bg-slate-50"
              >
                <td className="px-6 py-4">
                  {user.name}
                </td>

                <td className="px-6 py-4">
                  {user.email}
                </td>

                <td className="px-6 py-4">
                  {user.role}
                </td>

                <td className="px-6 py-4">
                  <UserStatusBadge
                    isActive={user.isActive}
                  />
                </td>

                <td className="px-6 py-4">
                  <button
                    type="button"
                    onClick={() =>
                      handleUserStatus(user)
                    }
                    disabled={
                      updatingUser === user.id
                    }
                    className="rounded-lg bg-indigo-600 px-3 py-2 text-sm text-white hover:bg-indigo-700"
                  >
                    {updatingUser === user.id
                      ? "Updating..."
                      : user.isActive
                      ? "Deactivate"
                      : "Activate"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    {/* Mobile Cards */}

    <div className="space-y-4 md:hidden">
      {users.map((user) => (
        <div
          key={user.id}
          className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <h3 className="text-lg font-bold text-slate-900">
            {user.name}
          </h3>

          <div className="mt-4 space-y-3 text-sm">
            <div>
              <p className="text-slate-500">
                Email
              </p>

              <p className="font-medium">
                {user.email}
              </p>
            </div>

            <div>
              <p className="text-slate-500">
                Role
              </p>

              <p className="font-medium">
                {user.role}
              </p>
            </div>

            <div>
              <p className="text-slate-500">
                Status
              </p>

              <UserStatusBadge
                isActive={user.isActive}
              />
            </div>

            <button
              type="button"
              onClick={() =>
                handleUserStatus(user)
              }
              disabled={
                updatingUser === user.id
              }
              className="mt-3 w-full rounded-lg bg-indigo-600 px-4 py-3 font-medium text-white hover:bg-indigo-700"
            >
              {updatingUser === user.id
                ? "Updating..."
                : user.isActive
                ? "Deactivate"
                : "Activate"}
            </button>
          </div>
        </div>
      ))}
    </div>
  </>
)}
      {activeTab === "tasks" && (
  <>
    {/* Desktop Table */}

    <div className="hidden md:block rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <table className="min-w-full">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold">
              Title
            </th>

            <th className="px-6 py-3 text-left text-sm font-semibold">
              User
            </th>

            <th className="px-6 py-3 text-left text-sm font-semibold">
              Status
            </th>

            <th className="px-6 py-3 text-left text-sm font-semibold">
              Created
            </th>
          </tr>
        </thead>

        <tbody>
          {tasks.map((task) => (
            <tr
              key={task.id}
              className="border-t hover:bg-slate-50"
            >
              <td className="px-6 py-4">
                {task.title}
              </td>

              <td className="px-6 py-4">
                {task.user?.name}
              </td>

              <td className="px-6 py-4">
                {task.status}
              </td>

              <td className="px-6 py-4">
                {new Date(
                  task.createdAt
                ).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Mobile Cards */}

    <div className="space-y-4 md:hidden">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <h3 className="text-lg font-bold text-slate-900">
            {task.title}
          </h3>

          <div className="mt-4 space-y-3 text-sm">
            <div>
              <p className="text-slate-500">
                Assigned To
              </p>

              <p className="font-medium">
                {task.user?.name}
              </p>
            </div>

            <div>
              <p className="text-slate-500">
                Status
              </p>

              <span
                className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                  task.status === "COMPLETED"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {task.status}
              </span>
            </div>

            <div>
              <p className="text-slate-500">
                Created
              </p>

              <p className="font-medium">
                {new Date(
                  task.createdAt
                ).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </>
)}
    </DashboardLayout>
  );
}
  