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
  const [statistics, setStatistics] =
    useState(null);

  const [users, setUsers] =
  useState([]);  

  const [tasks, setTasks] =
  useState([]);

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
  <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
    <table className="min-w-full">
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
            className="border-t"
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
)}

{activeTab === "tasks" && (
  <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
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
            className="border-t"
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
)}
    </DashboardLayout>
  );
}