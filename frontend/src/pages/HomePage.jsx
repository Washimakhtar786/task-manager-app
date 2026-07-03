import { useEffect, useState } from "react";

import { getHealthStatus } from "../api/health.js";

import Loader from "../components/common/Loader.jsx";
import Message from "../components/common/Message.jsx";
import PageHeader from "../components/common/PageHeader.jsx";

export default function HomePage() {
  const [loading, setLoading] = useState(true);

  const [health, setHealth] = useState(null);

  const [error, setError] = useState("");

  useEffect(() => {
    async function loadHealthStatus() {
      try {
        const response = await getHealthStatus();

        setHealth(response);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Unable to connect to backend."
        );
      } finally {
        setLoading(false);
      }
    }

    loadHealthStatus();
  }, []);

  return (
    <>
      <PageHeader
        title="Task Manager"
        description="Frontend successfully connected to the backend."
      />

      {loading ? (
        <Loader message="Checking backend..." />
      ) : error ? (
        <Message type="error">
          {error}
        </Message>
      ) : (
        <Message type="success">
          {health.message}
        </Message>
      )}
    </>
  );
}