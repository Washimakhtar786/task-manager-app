import TaskStatusBadge from "./TaskStatusBadge.jsx";
import { formatDate } from "../../utils/date.js";

export default function TaskCard({
  task,
  onEdit,
  onDelete,
}) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            {task.title}
          </h3>

          <p className="mt-2 text-sm text-slate-600">
            {task.description || "No description provided."}
          </p>
        </div>

        <TaskStatusBadge
          status={task.status}
        />
      </div>

      <div className="mt-4 border-t border-slate-100 pt-4">
        <p className="text-xs text-slate-500">
          Created:{" "}
          {formatDate(task.createdAt)}
        </p>
      </div>

      <div className="mt-4 flex gap-3">
  <button
    type="button"
    onClick={onEdit}
    className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
  >
    Edit
  </button>

  <button
    type="button"
    onClick={onDelete}
    className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
  >
    Delete
  </button>
</div>
    </article>

    
  );
}