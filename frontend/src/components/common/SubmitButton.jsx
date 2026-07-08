import ButtonLoader from "./ButtonLoader.jsx";

export default function SubmitButton({
  children,
  loading = false,
  disabled = false,
  type = "submit",
}) {
  return (
    <button
      type={type}
      disabled={loading || disabled}
      className="
        inline-flex
        items-center
        justify-center
        gap-2
        rounded-lg
        bg-indigo-600
        px-5
        py-2.5
        font-medium
        text-white
        transition
        hover:bg-indigo-700
        disabled:cursor-not-allowed
        disabled:opacity-70
      "
    >
      {loading && <ButtonLoader />}

      <span>{children}</span>
    </button>
  );
}