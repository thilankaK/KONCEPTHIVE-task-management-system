import {
  AlertTriangle,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Pencil,
  Trash2,
  X,
} from "lucide-react";
import dayjs from "dayjs";

import type {
  Task,
  TaskPriority,
  TaskStatus,
} from "../../types/task.types";

interface TaskDetailsModalProps {
  task: Task | null;
  onClose: () => void;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}

const priorityStyles: Record<TaskPriority, string> = {
  LOW: "bg-emerald-100 text-emerald-700",
  MEDIUM: "bg-amber-100 text-amber-700",
  HIGH: "bg-red-100 text-red-700",
};

const statusStyles: Record<TaskStatus, string> = {
  PENDING: "bg-slate-100 text-slate-700",
  IN_PROGRESS: "bg-violet-100 text-violet-700",
  COMPLETED: "bg-blue-100 text-blue-700",
};

const formatLabel = (value: string) =>
  value
    .toLowerCase()
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) =>
      letter.toUpperCase()
    );

function TaskDetailsModal({
  task,
  onClose,
  onEdit,
  onDelete,
}: TaskDetailsModalProps) {
  if (!task) {
    return null;
  }

  const isOverdue =
    dayjs(task.dueDate).isBefore(dayjs(), "day") &&
    task.status !== "COMPLETED";

  const handleBackdropClick = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
      onMouseDown={handleBackdropClick}
    >
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5">
          <div className="pr-6">
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Task Details
            </p>

            <h2 className="mt-2 text-2xl font-bold text-slate-900">
              {task.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            aria-label="Close task details"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex flex-wrap gap-2">
            <span
              className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                priorityStyles[task.priority]
              }`}
            >
              {formatLabel(task.priority)} Priority
            </span>

            <span
              className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                statusStyles[task.status]
              }`}
            >
              {formatLabel(task.status)}
            </span>

            {isOverdue && (
              <span className="flex items-center gap-1.5 rounded-full bg-red-100 px-3 py-1.5 text-xs font-semibold text-red-700">
                <AlertTriangle className="h-3.5 w-3.5" />
                Overdue
              </span>
            )}
          </div>

          <div className="mt-6 rounded-2xl bg-slate-50 p-5">
            <p className="text-sm font-semibold text-slate-700">
              Description
            </p>

            <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-slate-600">
              {task.description ||
                "No description has been provided for this task."}
            </p>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
                  <CalendarDays className="h-5 w-5 text-blue-600" />
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Due Date
                  </p>

                  <p className="mt-1 font-semibold text-slate-800">
                    {dayjs(task.dueDate).format(
                      "DD MMMM YYYY"
                    )}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 p-4">
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                    task.status === "COMPLETED"
                      ? "bg-emerald-100"
                      : isOverdue
                        ? "bg-red-100"
                        : "bg-violet-100"
                  }`}
                >
                  {task.status === "COMPLETED" ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                  ) : isOverdue ? (
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                  ) : (
                    <Clock3 className="h-5 w-5 text-violet-600" />
                  )}
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Current Status
                  </p>

                  <p className="mt-1 font-semibold text-slate-800">
                    {formatLabel(task.status)}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Created Date
              </p>

              <p className="mt-2 font-semibold text-slate-800">
                {dayjs(task.createdAt).format(
                  "DD MMM YYYY, hh:mm A"
                )}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Last Updated
              </p>

              <p className="mt-2 font-semibold text-slate-800">
                {dayjs(task.updatedAt).format(
                  "DD MMM YYYY, hh:mm A"
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-slate-200 bg-slate-50 px-6 py-5 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => onDelete(task)}
            className="flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-5 py-3 font-semibold text-red-600 transition hover:bg-red-50"
          >
            <Trash2 className="h-5 w-5" />
            Delete
          </button>

          <button
            type="button"
            onClick={() => onEdit(task)}
            className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            <Pencil className="h-5 w-5" />
            Edit Task
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskDetailsModal;