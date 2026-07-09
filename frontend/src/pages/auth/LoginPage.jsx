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

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const { login } = useAuth();

  const navigate = useNavigate();

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

    try {
      setLoading(true);

      await login(formData);

      navigate("/dashboard", {
        replace: true,
      });
    } catch (error) {
      setError(
        getApiErrorMessage(error)
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-10">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">
        {/* Logo */}

        <div className="mb-10 flex justify-end">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-slate-200 shadow-sm">
            <span className="text-2xl font-bold text-indigo-600">
              T
            </span>
          </div>
        </div>

        {/* Heading */}

        <h1 className="text-5xl font-extrabold text-slate-900">
          Welcome Back 👋
        </h1>

        <p className="mt-3 text-lg text-slate-500">
          Sign in to continue to Task Manager.
        </p>

        <div className="mt-10">
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {error && (
              <Message type="error">
                {error}
              </Message>
            )}

            <FormInput
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              autoFocus
              autoComplete="email"
              required
            />

            <FormInput
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              autoComplete="current-password"
              required
            />

            <SubmitButton
              loading={loading}
              loadingText="Signing In..."
            >
              Sign In
            </SubmitButton>
          </form>

          <div className="mt-8 text-center text-base text-slate-500">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-indigo-600 transition hover:text-indigo-700 hover:underline"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}