import { useState } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "../../context/AuthContext.jsx";
import { getApiErrorMessage } from "../../utils/api-error.js";

import Message from "../../components/common/Message.jsx";
import FormInput from "../../components/common/FormInput.jsx";
import SubmitButton from "../../components/common/SubmitButton.jsx";

export default function RegisterPage() {
  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

  const { register } = useAuth();

  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (
      formData.password !==
      formData.confirmPassword
    ) {
      setError(
        "Passwords do not match."
      );
      return;
    }

    try {
      setLoading(true);

      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      setSuccess(
        "Account created successfully. Redirecting..."
      );

      setTimeout(() => {
        navigate("/login", {
          replace: true,
        });
      }, 1500);
    } catch (error) {
      setError(
        getApiErrorMessage(error)
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-8">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl">
        {/* Logo */}

        <div className="mb-6 flex justify-end">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 shadow-sm">
            <span className="text-xl font-bold text-indigo-600">
              T
            </span>
          </div>
        </div>

        {/* Heading */}

        <h1 className="text-4xl font-extrabold text-slate-900">
          Create Account
        </h1>

        <p className="mt-2 text-base text-slate-500">
          Join Task Manager and start organizing your work.
        </p>

        <div className="mt-7">
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            {error && (
              <Message type="error">
                {error}
              </Message>
            )}

            {success && (
              <Message type="success">
                {success}
              </Message>
            )}

            <FormInput
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              autoFocus
              autoComplete="name"
              required
            />

            <FormInput
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              autoComplete="email"
              required
            />

            <FormInput
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              autoComplete="new-password"
              required
            />

            <FormInput
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              autoComplete="new-password"
              required
            />

            <SubmitButton loading={loading}>
              Create Account
            </SubmitButton>
          </form>

          <div className="mt-6 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-indigo-600 transition hover:text-indigo-700 hover:underline"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}