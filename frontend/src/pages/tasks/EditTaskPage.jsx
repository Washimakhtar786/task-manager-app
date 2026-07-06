import { useEffect, useState } from "react";
import {
  useParams,
  useNavigate,
} from "react-router-dom";

import {
  fetchTaskById,
  updateTask,
} from "../../api/taskApi.js";

import PageHeader from "../../components/common/PageHeader.jsx";
import Loader from "../../components/common/Loader.jsx";
import Message from "../../components/common/Message.jsx";
import CreateTaskForm from "../../components/tasks/CreateTaskForm.jsx";

export default function EditTaskPage() {
    console.log("EDIT PAGE RENDER");
  const { taskId } = useParams();

  const navigate = useNavigate();

  const [task, setTask] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  useEffect(() => {
    loadTask();
  }, [taskId]);

  async function loadTask() {
    try {
      setLoading(true);

      setError("");

      const data =
        await fetchTaskById(taskId);

      setTask(data);
    } catch (error) {
      console.log(error);

      setError("Failed to load task.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(formData) {

    console.log("EDIT PAGE: handleSubmit START");

    try {
      setSaving(true);

      await updateTask(
        taskId,
        formData
      );



      console.log("UPDATE SUCCESS");
      console.log("NAVIGATING...");
      navigate("/tasks?updated=true");
    } catch (error) {
      console.log("UPDATE ERROR",error);

      setError("Failed to update task.");
    } finally {
      console.log("EDIT PAGE: FINALLY");  
      setSaving(false);
    }
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <PageHeader
        title="Edit Task"
        description={`Editing Task #${taskId}`}
      />

      {error && (
        <Message type="error">
          {error}
        </Message>
      )}

      {task && (
        <CreateTaskForm
          initialValues={task}
          onSubmit={handleSubmit}
          onCancel={() =>
            navigate("/tasks")
          }
          loading={saving}
        />
      )}
    </>
  );
}