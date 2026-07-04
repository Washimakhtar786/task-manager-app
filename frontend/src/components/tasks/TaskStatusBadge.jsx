const statusStyles = {
  PENDING:
    "bg-yellow-100 text-yellow-800",

  IN_PROGRESS:
    "bg-blue-100 text-blue-800",

  COMPLETED:
    "bg-green-100 text-green-800",
};

const statusLabels = {
  PENDING: "Pending",

  IN_PROGRESS: "In Progress",

  COMPLETED: "Completed",
};

export default function TaskStatusBadge({
  status,
}) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
        statusStyles[status] ??
          "bg-slate-100 text-slate-700",
      ].join(" ")}
    >
      {statusLabels[status] ?? status}
    </span>
  );
}