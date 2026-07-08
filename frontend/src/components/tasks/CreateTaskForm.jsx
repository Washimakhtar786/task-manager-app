import { useState } from "react";

import FormInput from "../common/FormInput.jsx";
import SubmitButton from "../common/SubmitButton.jsx";

export default function CreateTaskForm({
  onSubmit,
  onCancel,
  loading = false,
  initialValues = null,
}) {
  const [formData, setFormData] = useState({
    title: initialValues?.title ?? "",
    description: initialValues?.description ?? "",
    status: initialValues?.status ?? "PENDING",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    await onSubmit(formData);

    setFormData({
      title: "",
      description: "",
      status: "PENDING",
    });
  }

  return (
    <div className="mb-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-xl font-semibold text-slate-900">
        {initialValues
          ? "Update Task"
          : "Create New Task"}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <FormInput
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter task title"
          required
        />

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Description
          </label>

          <textarea
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter task description"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none transition-colors focus:border-indigo-500"
          />
        </div>

        {/* Status */}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Status
          </label>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none transition-colors focus:border-indigo-500"
          >
            <option value="PENDING">
              Pending
            </option>

            <option value="COMPLETED">
              Completed
            </option>
          </select>
        </div>

        <div className="flex gap-3">
          <SubmitButton disabled={loading}>
            {loading
              ? initialValues
                ? "Updating..."
                : "Creating..."
              : initialValues
              ? "Update Task"
              : "Create Task"}
          </SubmitButton>

          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}