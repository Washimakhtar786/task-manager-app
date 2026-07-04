export default function TaskSummary({
  tasks,
}) {
  const totalTasks = tasks.length;

  const pendingTasks = tasks.filter(
    (task) => task.status === "PENDING"
  ).length;

  const inProgressTasks = tasks.filter(
    (task) =>
      task.status === "IN_PROGRESS"
  ).length;

  const completedTasks = tasks.filter(
    (task) => task.status === "COMPLETED"
  ).length;

  const summaryItems = [
    {
      label: "Total",
      value: totalTasks,
      color: "bg-slate-100 text-slate-800",
    },
    {
      label: "Pending",
      value: pendingTasks,
      color: "bg-yellow-100 text-yellow-800",
    },
    {
      label: "In Progress",
      value: inProgressTasks,
      color: "bg-blue-100 text-blue-800",
    },
    {
      label: "Completed",
      value: completedTasks,
      color: "bg-green-100 text-green-800",
    },
  ];

  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {summaryItems.map((item) => (
        <div
          key={item.label}
          className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <p className="text-sm text-slate-500">
            {item.label}
          </p>

          <p
            className={[
              "mt-3 inline-flex rounded-full px-3 py-1 text-2xl font-bold",
              item.color,
            ].join(" ")}
          >
            {item.value}
          </p>
        </div>
      ))}
    </section>
  );
}