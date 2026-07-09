import { useEffect, useState } from "react";

import { fetchTasks } from "../api/taskApi.js";

import DashboardLayout from "../components/layout/DashboardLayout.jsx";

import WelcomeCard from "../components/dashboard/WelcomeCard.jsx";
import StatCard from "../components/dashboard/StatCard.jsx";
import RecentTasks from "../components/dashboard/RecentTasks.jsx";
import QuickActions from "../components/dashboard/QuickActions.jsx";

export default function DashboardPage() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    try {
      const data = await fetchTasks();

      setTasks(data.tasks);
    } catch (error) {
      console.log(error);
    }
  }

  const totalTasks = tasks.length;

  const pendingTasks = tasks.filter(
    (task) => task.status === "PENDING"
  ).length;

  const completedTasks = tasks.filter(
    (task) => task.status === "COMPLETED"
  ).length;

  const recentTasks = tasks
    .slice()
    .sort(
      (a, b) =>
        new Date(b.createdAt) -
        new Date(a.createdAt)
    )
    .slice(0, 5);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <WelcomeCard />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Total Tasks"
            value={totalTasks}
          />

          <StatCard
            title="Pending"
            value={pendingTasks}
          />

          <StatCard
            title="Completed"
            value={completedTasks}
          />

          <StatCard
            title="Recent"
            value={recentTasks.length}
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <RecentTasks tasks={recentTasks} />

          <QuickActions />
        </div>
      </div>
    </DashboardLayout>
  );
}