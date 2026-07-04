export default function SubmitButton({
  children,
  loading = false,
  loadingText = "Please wait...",
  type = "submit",
}) {
  return (
    <button
      type={type}
      disabled={loading}
      className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-white font-medium transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading ? loadingText : children}
    </button>
  );
}