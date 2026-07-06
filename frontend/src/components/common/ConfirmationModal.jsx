export default function ConfirmationModal({
  open,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  loading = false,
  onConfirm,
  onCancel,
}) {
  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirmation-title"
    >
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">

        <h2
          id="confirmation-title"
          className="text-xl font-bold text-slate-900"
        >
          {title}
        </h2>

        <p className="mt-3 text-sm leading-6 text-slate-600">
          {message}
        </p>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {cancelText}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-red-400"
          >
            {loading
              ? "Deleting..."
              : confirmText}
          </button>

        </div>

      </div>
    </div>
  );
}