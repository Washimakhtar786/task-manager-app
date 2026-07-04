export default function FormInput({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder = "",
  error = "",
  required = false,
}) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-slate-700"
      >
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`w-full rounded-lg border px-3 py-2 outline-none transition-colors ${
          error
            ? "border-red-500 focus:border-red-500"
            : "border-slate-300 focus:border-indigo-500"
        }`}
      />

      {error ? (
        <p className="text-sm text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}