import {
  AlertTriangle,
  CalendarDays,
  CheckCircle2,
  Clock3,
} from "lucide-react";

import dayjs from "dayjs";

import type {
  Task,
  TaskPriority,
  TaskStatus,
} from "../../types/task.types";

interface DashboardTaskCardProps {
  task: Task;
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

function DashboardTaskCard({
  task,
}: DashboardTaskCardProps) {
  const isOverdue =
    dayjs(task.dueDate).isBefore(dayjs(), "day") &&
    task.status !== "COMPLETED";

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="truncate font-bold text-slate-900">
            {task.title}
          </h3>

          <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">
            {task.description ||
              "No description provided."}
          </p>
        </div>

        {task.status === "COMPLETED" ? (
          <CheckCircle2 className="h-6 w-6 shrink-0 text-emerald-500" />
        ) : isOverdue ? (
          <AlertTriangle className="h-6 w-6 shrink-0 text-red-500" />
        ) : (
          <Clock3 className="h-6 w-6 shrink-0 text-blue-500" />
        )}
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            priorityStyles[task.priority]
          }`}
        >
          {formatLabel(task.priority)}
        </span>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            statusStyles[task.status]
          }`}
        >
          {formatLabel(task.status)}
        </span>

        {isOverdue && (
          <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
            Overdue
          </span>
        )}
      </div>

      <div className="mt-5 flex items-center gap-2 border-t border-slate-100 pt-4 text-sm text-slate-500">
        <CalendarDays className="h-4 w-4" />

        <span>
          Due {dayjs(task.dueDate).format("DD MMM YYYY")}
        </span>
      </div>
    </article>
  );
}

export default DashboardTaskCard;