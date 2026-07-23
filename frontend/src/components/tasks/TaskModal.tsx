import { useEffect, useState, type FormEvent } from "react";
import { LoaderCircle, X } from "lucide-react";

import type {
  Task,
  TaskFormData,
  TaskPriority,
  TaskStatus,
} from "../../types/task.types";

interface TaskModalProps {
  isOpen: boolean;
  task: Task | null;
  isSubmitting: boolean;
  onClose: () => void;
  onSubmit: (data: TaskFormData) => Promise<void>;
}

const initialFormData: TaskFormData = {
  title: "",
  description: "",
  priority: "MEDIUM",
  status: "PENDING",
  dueDate: "",
};

function TaskModal({
  isOpen,
  task,
  isSubmitting,
  onClose,
  onSubmit,
}: TaskModalProps) {
  const [formData, setFormData] =
    useState<TaskFormData>(initialFormData);
  const [error, setError] = useState("");

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description || "",
        priority: task.priority,
        status: task.status,
        dueDate: task.dueDate.split("T")[0],
      });
    } else {
      setFormData(initialFormData);
    }

    setError("");
  }, [task, isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (
      !formData.title.trim() ||
      !formData.priority ||
      !formData.status ||
      !formData.dueDate
    ) {
      setError("Please complete all required fields.");
      return;
    }

    const selectedDate = new Date(
      `${formData.dueDate}T23:59:59`
    );

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (!task && selectedDate < today) {
      setError("Due date cannot be earlier than today.");
      return;
    }

    setError("");

    await onSubmit({
      ...formData,
      title: formData.title.trim(),
      description: formData.description?.trim(),
    });
  };

  const inputClassName =
    "mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              {task ? "Edit Task" : "Create New Task"}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {task
                ? "Update the task information."
                : "Add a new task to your task list."}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 p-6"
        >
          <div>
            <label className="text-sm font-medium text-slate-700">
              Title <span className="text-red-500">*</span>
            </label>

            <input
              type="text"
              value={formData.title}
              onChange={(event) =>
                setFormData((current) => ({
                  ...current,
                  title: event.target.value,
                }))
              }
              placeholder="Enter task title"
              className={inputClassName}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">
              Description
            </label>

            <textarea
              value={formData.description}
              onChange={(event) =>
                setFormData((current) => ({
                  ...current,
                  description: event.target.value,
                }))
              }
              placeholder="Enter task description"
              rows={4}
              className={`${inputClassName} resize-none`}
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-slate-700">
                Priority <span className="text-red-500">*</span>
              </label>

              <select
                value={formData.priority}
                onChange={(event) =>
                  setFormData((current) => ({
                    ...current,
                    priority:
                      event.target.value as TaskPriority,
                  }))
                }
                className={inputClassName}
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">
                Status <span className="text-red-500">*</span>
              </label>

              <select
                value={formData.status}
                onChange={(event) =>
                  setFormData((current) => ({
                    ...current,
                    status:
                      event.target.value as TaskStatus,
                  }))
                }
                className={inputClassName}
              >
                <option value="PENDING">Pending</option>
                <option value="IN_PROGRESS">
                  In Progress
                </option>
                <option value="COMPLETED">
                  Completed
                </option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">
              Due Date <span className="text-red-500">*</span>
            </label>

            <input
              type="date"
              value={formData.dueDate}
              onChange={(event) =>
                setFormData((current) => ({
                  ...current,
                  dueDate: event.target.value,
                }))
              }
              min={
                task
                  ? undefined
                  : new Date().toISOString().split("T")[0]
              }
              className={inputClassName}
            />
          </div>

          {error && (
            <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="rounded-xl border border-slate-200 px-5 py-3 font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex min-w-32 items-center justify-center rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />
                  Saving...
                </>
              ) : task ? (
                "Update Task"
              ) : (
                "Create Task"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskModal;