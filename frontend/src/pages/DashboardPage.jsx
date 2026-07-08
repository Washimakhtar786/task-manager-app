import DashboardLayout from "../components/layout/DashboardLayout.jsx";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Dashboard
        </h1>

        <p className="mt-2 text-slate-600">
          Welcome back! Here's an overview of your tasks.
        </p>
      </div>
    </DashboardLayout>
  );
}