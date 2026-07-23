// import { useCallback, useEffect, useState } from "react";
// import toast from "react-hot-toast";

// import { getTasks } from "../api/task.api";
// import TaskTable from "../components/tasks/TaskTable";
// import TaskToolbar from "../components/tasks/TaskToolbar";
// import DashboardLayout from "../layouts/DashboardLayout";

// import type {
//   Task,
//   TaskPriority,
//   TaskSortOption,
//   TaskStatus,
// } from "../types/task.types";

// function Tasks() {
//   const [tasks, setTasks] = useState<Task[]>([]);
//   const [search, setSearch] = useState("");
//   const [status, setStatus] =
//     useState<TaskStatus | "">("");
//   const [priority, setPriority] =
//     useState<TaskPriority | "">("");
//   const [sortBy, setSortBy] =
//     useState<TaskSortOption>("newest");
//   const [isLoading, setIsLoading] = useState(true);

//   const loadTasks = useCallback(async () => {
//     try {
//       setIsLoading(true);

//       const response = await getTasks({
//         search,
//         status,
//         priority,
//         sortBy,
//       });

//       setTasks(response.data);
//     } catch (error) {
//       console.error("Load tasks error:", error);
//       toast.error("Unable to load tasks.");
//     } finally {
//       setIsLoading(false);
//     }
//   }, [search, status, priority, sortBy]);

//   useEffect(() => {
//     const timeoutId = window.setTimeout(() => {
//       loadTasks();
//     }, 300);

//     return () => window.clearTimeout(timeoutId);
//   }, [loadTasks]);

//   const handleCreateTask = () => {
//     toast("Create task form will open here.");
//   };

//   return (
//     <DashboardLayout>
//       <div>
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-slate-900">
//             Tasks
//           </h1>

//           <p className="mt-2 text-slate-500">
//             Create, organize and track your daily tasks.
//           </p>
//         </div>

//         <TaskToolbar
//           search={search}
//           status={status}
//           priority={priority}
//           sortBy={sortBy}
//           onSearchChange={setSearch}
//           onStatusChange={setStatus}
//           onPriorityChange={setPriority}
//           onSortChange={setSortBy}
//           onCreateTask={handleCreateTask}
//         />

//         <div className="mt-6">
//           <TaskTable
//             tasks={tasks}
//             isLoading={isLoading}
//           />
//         </div>
//       </div>
//     </DashboardLayout>
//   );
// }

// export default Tasks;




import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from "../api/task.api";
import DeleteConfirmModal from "../components/tasks/DeleteConfirmModal";
import TaskModal from "../components/tasks/TaskModal";
import TaskTable from "../components/tasks/TaskTable";
import TaskToolbar from "../components/tasks/TaskToolbar";
import DashboardLayout from "../layouts/DashboardLayout";

import type {
  Task,
  TaskFormData,
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

  const [isTaskModalOpen, setIsTaskModalOpen] =
    useState(false);
  const [selectedTask, setSelectedTask] =
    useState<Task | null>(null);
  const [taskToDelete, setTaskToDelete] =
    useState<Task | null>(null);

  const [isSubmitting, setIsSubmitting] =
    useState(false);
  const [isDeleting, setIsDeleting] =
    useState(false);

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
    setSelectedTask(null);
    setIsTaskModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    setIsTaskModalOpen(true);
  };

  const handleCloseTaskModal = () => {
    if (isSubmitting) {
      return;
    }

    setIsTaskModalOpen(false);
    setSelectedTask(null);
  };

  const handleSubmitTask = async (
    data: TaskFormData
  ) => {
    try {
      setIsSubmitting(true);

      if (selectedTask) {
        await updateTask(selectedTask.id, data);
        toast.success("Task updated successfully.");
      } else {
        await createTask(data);
        toast.success("Task created successfully.");
      }

      // handleCloseTaskModal();
      // await loadTasks();

      setIsTaskModalOpen(false);
      setSelectedTask(null);
      await loadTasks();
    } catch (error: unknown) {
      console.error("Save task error:", error);
      toast.error("Unable to save the task.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteTask = async () => {
    if (!taskToDelete) {
      return;
    }

    try {
      setIsDeleting(true);

      await deleteTask(taskToDelete.id);

      toast.success("Task deleted successfully.");
      setTaskToDelete(null);
      await loadTasks();
    } catch (error: unknown) {
      console.error("Delete task error:", error);
      toast.error("Unable to delete the task.");
    } finally {
      setIsDeleting(false);
    }
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
            onEdit={handleEditTask}
            onDelete={setTaskToDelete}
          />
        </div>
      </div>

      <TaskModal
        isOpen={isTaskModalOpen}
        task={selectedTask}
        isSubmitting={isSubmitting}
        onClose={handleCloseTaskModal}
        onSubmit={handleSubmitTask}
      />

      <DeleteConfirmModal
        task={taskToDelete}
        isDeleting={isDeleting}
        onClose={() => setTaskToDelete(null)}
        onConfirm={handleDeleteTask}
      />
    </DashboardLayout>
  );
}

export default Tasks;