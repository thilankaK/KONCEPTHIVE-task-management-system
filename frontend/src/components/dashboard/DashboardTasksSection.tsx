import { ArrowRight, ClipboardList } from "lucide-react";
import { useNavigate } from "react-router-dom";

import DashboardTaskCard from "./DashboardTaskCard";

import type { Task } from "../../types/task.types";

interface DashboardTasksSectionProps {
  tasks: Task[];
}

function DashboardTasksSection({
  tasks,
}: DashboardTasksSectionProps) {
  const navigate = useNavigate();

  const upcomingTasks = [...tasks]
    .filter(
      (task) => task.status !== "COMPLETED"
    )
    .sort(
      (firstTask, secondTask) =>
        new Date(firstTask.dueDate).getTime() -
        new Date(secondTask.dueDate).getTime()
    )
    .slice(0, 6);

  return (
    <section className="mt-8">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Upcoming Tasks
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Your nearest pending and in-progress
            deadlines.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/tasks")}
          className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
        >
          View all tasks
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      {upcomingTasks.length === 0 ? (
        <div className="flex min-h-60 items-center justify-center rounded-2xl border border-slate-200 bg-white p-8 text-center">
          <div>
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
              <ClipboardList className="h-7 w-7 text-slate-400" />
            </div>

            <h3 className="mt-4 text-lg font-semibold text-slate-800">
              No upcoming tasks
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Create a task to start tracking your
              work.
            </p>

            <button
              type="button"
              onClick={() => navigate("/tasks")}
              className="mt-5 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Go to Tasks
            </button>
          </div>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {upcomingTasks.map((task) => (
            <DashboardTaskCard
              key={task.id}
              task={task}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default DashboardTasksSection;