import ButtonLoader from "./ButtonLoader.jsx";

export default function SubmitButton({
  children,
  loading = false,
  disabled = false,
  type = "submit",
  className = "",
}) {
  return (
    <button
      type={type}
      disabled={loading || disabled}
      className={`
        flex
        h-14
        w-full
        items-center
        justify-center
        gap-3
        rounded-2xl
        bg-indigo-600
        text-base
        font-semibold
        text-white
        shadow-lg
        transition-all
        duration-200
        hover:-translate-y-0.5
        hover:bg-indigo-700
        hover:shadow-xl
        active:scale-[0.98]
        disabled:cursor-not-allowed
        disabled:opacity-70
        ${className}
      `}
    >
      {loading && <ButtonLoader />}

      <span>
        {loading ? "Signing In..." : children}
      </span>
    </button>
  );
}