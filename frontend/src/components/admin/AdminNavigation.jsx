export default function AdminNavigation({
  activeTab,
  onChange,
}) {
  const tabs = [
    {
      key: "dashboard",
      label: "Dashboard",
    },
    {
      key: "users",
      label: "Users",
    },
    {
      key: "tasks",
      label: "Tasks",
    },
  ];

  return (
    <div className="mb-6 flex flex-wrap gap-3">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          type="button"
          onClick={() =>
            onChange(tab.key)
          }
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === tab.key
              ? "bg-indigo-600 text-white"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}