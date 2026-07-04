const filterOptions = [
  {
    label: "All",
    value: "",
  },
  {
    label: "Pending",
    value: "PENDING",
  },
  {
    label: "In Progress",
    value: "IN_PROGRESS",
  },
  {
    label: "Completed",
    value: "COMPLETED",
  },
];

export default function TaskFilter({
  selectedStatus,
  onChange,
}) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <label
        htmlFor="task-filter"
        className="text-sm font-medium text-slate-700"
      >
        Filter:
      </label>

      <select
        id="task-filter"
        value={selectedStatus}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition-colors focus:border-indigo-500"
      >
        {filterOptions.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}