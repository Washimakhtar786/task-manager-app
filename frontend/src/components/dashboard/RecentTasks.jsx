import { Link } from "react-router-dom";

export default function RecentTasks({
  tasks = [],
}) {
  function getStatusClass(status) {
    switch (status) {
      case "COMPLETED":
        return "bg-green-100 text-green-700";

      case "IN_PROGRESS":
        return "bg-yellow-100 text-yellow-700";

      default:
        return "bg-slate-100 text-slate-700";
    }
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Recent Tasks
          </h2>

          <p className="text-sm text-slate-500">
            Your latest task activity
          </p>
        </div>

        <Link
          to="/tasks"
          className="text-sm font-semibold text-indigo-600 hover:underline"
        >
          View All
        </Link>
      </div>

      {tasks.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 py-10 text-center text-slate-500">
          No recent tasks found.
        </div>
      ) : (
        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="rounded-xl border border-slate-200 p-4 transition hover:border-indigo-300 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-slate-900">
                    {task.title}
                  </h3>

                  <p className="mt-2 text-sm text-slate-500">
                    {task.description ||
                      "No description"}
                  </p>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                    task.status
                  )}`}
                >
                  {task.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}