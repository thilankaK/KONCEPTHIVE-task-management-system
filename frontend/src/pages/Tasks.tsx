import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

import { getTasks } from "../api/task.api";
import TaskTable from "../components/tasks/TaskTable";
import TaskToolbar from "../components/tasks/TaskToolbar";
import DashboardLayout from "../layouts/DashboardLayout";

import type {
  Task,
  TaskPriority,
  TaskSortOption,
  TaskStatus,
} from "../types/task.types";

function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] =
    useState<TaskStatus | "">("");
  const [priority, setPriority] =
    useState<TaskPriority | "">("");
  const [sortBy, setSortBy] =
    useState<TaskSortOption>("newest");
  const [isLoading, setIsLoading] = useState(true);

  const loadTasks = useCallback(async () => {
    try {
      setIsLoading(true);

      const response = await getTasks({
        search,
        status,
        priority,
        sortBy,
      });

      setTasks(response.data);
    } catch (error) {
      console.error("Load tasks error:", error);
      toast.error("Unable to load tasks.");
    } finally {
      setIsLoading(false);
    }
  }, [search, status, priority, sortBy]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      loadTasks();
    }, 300);

    return () => window.clearTimeout(timeoutId);
  }, [loadTasks]);

  const handleCreateTask = () => {
    toast("Create task form will open here.");
  };

  return (
    <DashboardLayout>
      <div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Tasks
          </h1>

          <p className="mt-2 text-slate-500">
            Create, organize and track your daily tasks.
          </p>
        </div>

        <TaskToolbar
          search={search}
          status={status}
          priority={priority}
          sortBy={sortBy}
          onSearchChange={setSearch}
          onStatusChange={setStatus}
          onPriorityChange={setPriority}
          onSortChange={setSortBy}
          onCreateTask={handleCreateTask}
        />

        <div className="mt-6">
          <TaskTable
            tasks={tasks}
            isLoading={isLoading}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Tasks;