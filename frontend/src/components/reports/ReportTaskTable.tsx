import {
  CalendarDays,
  ClipboardList,
} from "lucide-react";
import dayjs from "dayjs";

import type {
  Task,
  TaskPriority,
  TaskStatus,
} from "../../types/task.types";

interface ReportTaskTableProps {
  tasks: Task[];
}

const priorityStyles: Record<
  TaskPriority,
  string
> = {
  LOW: "bg-emerald-100 text-emerald-700",
  MEDIUM: "bg-amber-100 text-amber-700",
  HIGH: "bg-red-100 text-red-700",
};

const statusStyles: Record<
  TaskStatus,
  string
> = {
  PENDING: "bg-slate-100 text-slate-700",
  IN_PROGRESS:
    "bg-violet-100 text-violet-700",
  COMPLETED: "bg-blue-100 text-blue-700",
};

const formatLabel = (value: string) =>
  value
    .toLowerCase()
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) =>
      letter.toUpperCase()
    );

function ReportTaskTable({
  tasks,
}: ReportTaskTableProps) {
  return (
    <section className="mt-8">
      <div className="mb-5">
        <h2 className="text-xl font-bold text-slate-900">
          Report Task Details
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Complete task records included in the
          selected report period.
        </p>
      </div>

      {tasks.length === 0 ? (
        <div className="flex min-h-64 items-center justify-center rounded-3xl border border-slate-200 bg-white p-8 text-center">
          <div>
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
              <ClipboardList className="h-8 w-8 text-slate-400" />
            </div>

            <h3 className="mt-5 text-lg font-bold text-slate-900">
              No tasks in this report
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Select another period or date range.
            </p>
          </div>
        </div>
      ) : (
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="border-b border-slate-200 bg-slate-50">
                <tr>
                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Task
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Priority
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Status
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Due Date
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Created
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Updated
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {tasks.map((task) => (
                  <tr
                    key={task.id}
                    className="align-top transition hover:bg-slate-50"
                  >
                    <td className="min-w-72 px-5 py-4">
                      <p className="font-semibold text-slate-800">
                        {task.title}
                      </p>

                      <p className="mt-1 max-w-md text-sm leading-6 text-slate-500">
                        {task.description ||
                          "No description provided"}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                          priorityStyles[
                            task.priority
                          ]
                        }`}
                      >
                        {formatLabel(
                          task.priority
                        )}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                          statusStyles[
                            task.status
                          ]
                        }`}
                      >
                        {formatLabel(task.status)}
                      </span>
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600">
                      <div className="flex items-center gap-2">
                        <CalendarDays className="h-4 w-4 text-slate-400" />

                        {dayjs(
                          task.dueDate
                        ).format("DD MMM YYYY")}
                      </div>
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600">
                      {dayjs(
                        task.createdAt
                      ).format("DD MMM YYYY")}
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600">
                      {dayjs(
                        task.updatedAt
                      ).format("DD MMM YYYY")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
}

export default ReportTaskTable;