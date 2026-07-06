import {
  useEffect,
  useState,
} from "react";

import {
  useSearchParams,
} from "react-router-dom";

import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../../api/taskApi.js";

import PageHeader from "../../components/common/PageHeader.jsx";
import Message from "../../components/common/Message.jsx";
import ConfirmationModal from "../../components/common/ConfirmationModal.jsx";

import TaskSummary from "../../components/tasks/TaskSummary.jsx";
import TaskFilter from "../../components/tasks/TaskFilter.jsx";
import TaskCard from "../../components/tasks/TaskCard.jsx";
import EmptyTasks from "../../components/tasks/EmptyTasks.jsx";
import CreateTaskForm from "../../components/tasks/CreateTaskForm.jsx";

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);

  const [selectedStatus, setSelectedStatus] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [showCreateForm, setShowCreateForm] =
    useState(false);

  const [creating, setCreating] =
    useState(false);

  const [editingTask, setEditingTask] =
    useState(null);

  const [deleting, setDeleting] =
    useState(false);

  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

  const [taskToDelete, setTaskToDelete] =
    useState(null);

  const [searchParams] =
  useSearchParams();
  
  const [successMessage, setSuccessMessage] =
  useState("");

  async function loadTasks(status = "") {
    try {
      setLoading(true);

      setError("");

      const data = await fetchTasks(status);

      setTasks(data.tasks);
    } catch (error) {
      setError("Failed to load tasks.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTasks(selectedStatus);
  }, [selectedStatus]);

  useEffect(() => {
  if (
    searchParams.get("updated") ===
    "true"
  ) {
    setSuccessMessage(
      "Task updated successfully."
    );
  }
}, [searchParams]);

  async function handleCreateTask(taskData) {
    try {
      setCreating(true);

      if (editingTask) {
        await updateTask(
          editingTask.id,
          taskData
        );
      } else {
        await createTask(taskData);
      }

      await loadTasks(selectedStatus);

      setEditingTask(null);

      setShowCreateForm(false);
    } catch (error) {
      console.log(
        "CREATE TASK ERROR =",
        error.response?.data
      );

      setError(
        editingTask
          ? "Failed to update task."
          : "Failed to create task."
      );
    } finally {
      setCreating(false);
    }
  }

  async function handleDeleteTask() {
    if (!taskToDelete) {
      return;
    }

    try {
      setDeleting(true);

      setError("");

      await deleteTask(taskToDelete.id);

      await loadTasks(selectedStatus);

      if (
        editingTask &&
        editingTask.id === taskToDelete.id
      ) {
        setEditingTask(null);
        setShowCreateForm(false);
      }

      setTaskToDelete(null);
      setShowDeleteModal(false);
    }  
    catch (error) {
  console.log(
    "DELETE ERROR =",
    error.response?.data
  );

  



  setError(
    error.response?.data?.message ||
    "Failed to delete task."
  );
}
    finally {
      setDeleting(false);
    }
  }

  return (
    <>
      <PageHeader
        title="My Tasks"
        description="Manage and organize your daily work."
      />

      <div className="mb-6 flex justify-end">
        <button
          type="button"
          onClick={() =>
            setShowCreateForm(true)
          }
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
        >
          + New Task
        </button>
      </div>

      {(showCreateForm || editingTask) && (
        <CreateTaskForm
          initialValues={editingTask}
          onSubmit={handleCreateTask}
          onCancel={() => {
            setShowCreateForm(false);
            setEditingTask(null);
          }}
          loading={creating}
        />
      )}

      {loading && (
        <Message>
          Loading tasks...
        </Message>
      )}


      {successMessage && (
  <Message type="success">
    {successMessage}
  </Message>
)}

      {!loading && error && (
        <Message variant="error">
          {error}
        </Message>
      )}

      {!loading &&
        !error &&
        tasks.length === 0 && (
          <EmptyTasks />
        )}

      {!loading &&
        !error &&
        tasks.length > 0 && (
          <>
            <TaskSummary
              tasks={tasks}
            />

            <div className="mt-6">
              <TaskFilter
                selectedStatus={selectedStatus}
                onChange={setSelectedStatus}
              />
            </div>

            <div className="mt-6 grid gap-4">
              {tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onEdit={() => {
                    setEditingTask(task);
                    setShowCreateForm(true);
                  }}
                  onDelete={() => {
                    setTaskToDelete(task);
                    setShowDeleteModal(true);
                  }}
                />
              ))}
            </div>
          </>
        )}

      <ConfirmationModal
        open={showDeleteModal}
        title="Delete Task"
        message="Are you sure you want to permanently delete this task?"
        confirmText="Delete"
        cancelText="Cancel"
        loading={deleting}
        onConfirm={handleDeleteTask}
        onCancel={() => {
          setShowDeleteModal(false);
          setTaskToDelete(null);
        }}
      />
    </>
  );
}