import { useState } from "react";
import {
  MdVisibility,
  MdVisibilityOff,
} from "react-icons/md";

export default function FormInput({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder = "",
  error = "",
  required = false,
  autoComplete,
  autoFocus = false,
}) {
  const [showPassword, setShowPassword] =
    useState(false);

  const inputType =
    type === "password"
      ? showPassword
        ? "text"
        : "password"
      : type;

  return (
    <div className="space-y-2">
      <label
        htmlFor={name}
        className="block text-sm font-semibold text-slate-700"
      >
        {label}
      </label>

      <div className="relative">
        <input
          id={name}
          name={name}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          className={`h-14 w-full rounded-2xl border bg-white px-4 pr-12 text-slate-800 placeholder:text-slate-400 outline-none transition-all duration-200 ${
            error
              ? "border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-100"
              : "border-slate-300 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100"
          }`}
        />

        {type === "password" && (
          <button
            type="button"
            onClick={() =>
              setShowPassword(
                !showPassword
              )
            }
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-indigo-600"
          >
            {showPassword ? (
              <MdVisibilityOff size={22} />
            ) : (
              <MdVisibility size={22} />
            )}
          </button>
        )}
      </div>

      {error && (
        <p className="text-sm font-medium text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}