export default function EmptyTasks() {
  return (
    <div className="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-3xl">
        📋
      </div>

      <h2 className="mt-6 text-xl font-semibold text-slate-900">
        No Tasks Found
      </h2>

      <p className="mt-2 text-sm text-slate-600">
        Create your first task to start managing your work.
      </p>
    </div>
  );
}