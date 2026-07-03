export default function Loader({
  message = "Loading..."
}) {
  return (
    <div
      className="flex min-h-40 flex-col items-center justify-center gap-3"
      role="status"
      aria-live="polite"
    >
      <div className="h-9 w-9 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600" />

      <p className="text-sm font-medium text-slate-600">
        {message}
      </p>
    </div>
  );
}