import { Link } from "react-router-dom";

export default function QuickActions() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-xl font-semibold">
        Quick Actions
      </h2>

      <div className="flex gap-4">
        <Link
          to="/tasks"
          className="rounded-lg bg-indigo-600 px-5 py-3 text-white hover:bg-indigo-700"
        >
          My Tasks
        </Link>

        <Link
          to="/profile"
          className="rounded-lg bg-slate-200 px-5 py-3 hover:bg-slate-300"
        >
          Profile
        </Link>
      </div>
    </div>
  );
}