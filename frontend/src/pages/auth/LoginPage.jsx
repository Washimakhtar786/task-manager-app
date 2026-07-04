import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext.jsx";
import { getApiErrorMessage } from "../../utils/api-error.js";

import Message from "../../components/common/Message.jsx";
import PageHeader from "../../components/common/PageHeader.jsx";
import FormInput from "../../components/common/FormInput.jsx";
import SubmitButton from "../../components/common/SubmitButton.jsx";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login } = useAuth();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

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

      navigate("/tasks");
    } catch (error) {
      setError(getApiErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <PageHeader
        title="Sign In"
        description="Sign in to continue managing your tasks."
      />

      <div className="mx-auto max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          {error ? (
            <Message type="error">
              {error}
            </Message>
          ) : null}

          <FormInput
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />

          <FormInput
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />

          <SubmitButton
            loading={loading}
            loadingText="Signing In..."
          >
            Sign In
          </SubmitButton>
        </form>
      </div>
    </>
  );
}