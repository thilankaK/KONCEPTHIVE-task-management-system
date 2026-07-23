import { Plus, Search, SlidersHorizontal } from "lucide-react";

import type {
  TaskPriority,
  TaskSortOption,
  TaskStatus,
} from "../../types/task.types";

interface TaskToolbarProps {
  search: string;
  status: TaskStatus | "";
  priority: TaskPriority | "";
  sortBy: TaskSortOption;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: TaskStatus | "") => void;
  onPriorityChange: (value: TaskPriority | "") => void;
  onSortChange: (value: TaskSortOption) => void;
  onCreateTask: () => void;
}

function TaskToolbar({
  search,
  status,
  priority,
  sortBy,
  onSearchChange,
  onStatusChange,
  onPriorityChange,
  onSortChange,
  onCreateTask,
}: TaskToolbarProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

          <input
            type="search"
            value={search}
            onChange={(event) =>
              onSearchChange(event.target.value)
            }
            placeholder="Search tasks by title..."
            className="w-full rounded-xl border border-slate-200 py-3 pl-12 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div className="grid gap-3 sm:grid-cols-3 xl:flex">
          <select
            value={status}
            onChange={(event) =>
              onStatusChange(
                event.target.value as TaskStatus | ""
              )
            }
            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
          >
            <option value="">All statuses</option>
            <option value="PENDING">Pending</option>
            <option value="IN_PROGRESS">
              In Progress
            </option>
            <option value="COMPLETED">Completed</option>
          </select>

          <select
            value={priority}
            onChange={(event) =>
              onPriorityChange(
                event.target.value as TaskPriority | ""
              )
            }
            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
          >
            <option value="">All priorities</option>
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>

          <div className="relative">
            <SlidersHorizontal className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

            <select
              value={sortBy}
              onChange={(event) =>
                onSortChange(
                  event.target.value as TaskSortOption
                )
              }
              className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm outline-none focus:border-blue-500"
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
              <option value="dueDate">Due date</option>
            </select>
          </div>
        </div>

        <button
          type="button"
          onClick={onCreateTask}
          className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          <Plus className="h-5 w-5" />
          New Task
        </button>
      </div>
    </div>
  );
}

export default TaskToolbar;