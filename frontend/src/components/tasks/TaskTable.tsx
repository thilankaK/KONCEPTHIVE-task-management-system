// import {
//   CalendarDays,
//   LoaderCircle,
//   Pencil,
//   Trash2,
// } from "lucide-react";
// import dayjs from "dayjs";

// import type {
//   Task,
//   TaskPriority,
//   TaskStatus,
// } from "../../types/task.types";

// interface TaskTableProps {
//   tasks: Task[];
//   isLoading: boolean;
//   onView: (task: Task) => void;
//   onEdit: (task: Task) => void;
//   onDelete: (task: Task) => void;
// }

// const priorityStyles: Record<TaskPriority, string> = {
//   LOW: "bg-emerald-100 text-emerald-700",
//   MEDIUM: "bg-amber-100 text-amber-700",
//   HIGH: "bg-red-100 text-red-700",
// };

// const statusStyles: Record<TaskStatus, string> = {
//   PENDING: "bg-slate-100 text-slate-700",
//   IN_PROGRESS: "bg-violet-100 text-violet-700",
//   COMPLETED: "bg-blue-100 text-blue-700",
// };

// const formatLabel = (value: string) =>
//   value
//     .toLowerCase()
//     .replace("_", " ")
//     .replace(/\b\w/g, (letter) => letter.toUpperCase());

// function TaskTable({
//   tasks,
//   isLoading,
//   onView,
//   onEdit,
//   onDelete,
// }: TaskTableProps) {
//   if (isLoading) {
//     return (
//       <div className="flex min-h-72 items-center justify-center rounded-2xl border border-slate-200 bg-white">
//         <div className="text-center">
//           <LoaderCircle className="mx-auto h-8 w-8 animate-spin text-blue-600" />
//           <p className="mt-3 text-sm text-slate-500">
//             Loading tasks...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   if (tasks.length === 0) {
//     return (
//       <div className="flex min-h-72 items-center justify-center rounded-2xl border border-slate-200 bg-white p-8 text-center">
//         <div>
//           <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
//             <CalendarDays className="h-7 w-7 text-slate-400" />
//           </div>

//           <h3 className="mt-4 text-lg font-semibold text-slate-800">
//             No tasks found
//           </h3>

//           <p className="mt-2 text-sm text-slate-500">
//             Try changing your filters or create a new task.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
//       <div className="overflow-x-auto">
//         <table className="min-w-full">
//           <thead className="border-b border-slate-200 bg-slate-50">
//             <tr
//               key={task.id}
//               onClick={() => onView(task)}
//               className="cursor-pointer transition hover:bg-slate-50"
// >
//               <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
//                 Task
//               </th>
//               <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
//                 Priority
//               </th>
//               <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
//                 Status
//               </th>
//               <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
//                 Due Date
//               </th>
//               <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
//                 Actions
//               </th>
//             </tr>
//           </thead>

//           <tbody className="divide-y divide-slate-100">
//             {tasks.map((task) => (
//               <tr
//                 key={task.id}
//                 className="transition hover:bg-slate-50"
//               >
//                 <td className="px-6 py-4">
//                   <p className="font-semibold text-slate-800">
//                     {task.title}
//                   </p>

//                   <p className="mt-1 max-w-md truncate text-sm text-slate-500">
//                     {task.description ||
//                       "No description provided"}
//                   </p>
//                 </td>

//                 <td className="px-6 py-4">
//                   <span
//                     className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${priorityStyles[task.priority]}`}
//                   >
//                     {formatLabel(task.priority)}
//                   </span>
//                 </td>

//                 <td className="px-6 py-4">
//                   <span
//                     className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[task.status]}`}
//                   >
//                     {formatLabel(task.status)}
//                   </span>
//                 </td>

//                 <td className="px-6 py-4 text-sm text-slate-600">
//                   <div className="flex items-center gap-2">
//                     <CalendarDays className="h-4 w-4 text-slate-400" />
//                     {dayjs(task.dueDate).format(
//                       "DD MMM YYYY"
//                     )}
//                   </div>
//                 </td>

//                 <td className="px-6 py-4">
//                   <div className="flex justify-end gap-2">
//                     <button
//                       type="button"
//                       onClick={(event) => {
//                         event.stopPropagation();
//                         onEdit(task);
//                       }}
//                       className="rounded-lg p-2 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600"
//                       aria-label="Edit task"
//                     >
//                       <Pencil className="h-4 w-4" />
//                     </button>

//                     <button
//                       type="button"
//                       onClick={(event) => {
//                         event.stopPropagation();
//                         onDelete(task);
//                       }}
//                       className="rounded-lg p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600"
//                       aria-label="Delete task"
//                     >
//                       <Trash2 className="h-4 w-4" />
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default TaskTable;


import {
  CalendarDays,
  LoaderCircle,
  Pencil,
  Trash2,
} from "lucide-react";
import dayjs from "dayjs";

import type {
  Task,
  TaskPriority,
  TaskStatus,
} from "../../types/task.types";

interface TaskTableProps {
  tasks: Task[];
  isLoading: boolean;
  onView: (task: Task) => void;
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

function TaskTable({
  tasks,
  isLoading,
  onView,
  onEdit,
  onDelete,
}: TaskTableProps) {
  if (isLoading) {
    return (
      <div className="flex min-h-72 items-center justify-center rounded-2xl border border-slate-200 bg-white">
        <div className="text-center">
          <LoaderCircle className="mx-auto h-8 w-8 animate-spin text-blue-600" />

          <p className="mt-3 text-sm text-slate-500">
            Loading tasks...
          </p>
        </div>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="flex min-h-72 items-center justify-center rounded-2xl border border-slate-200 bg-white p-8 text-center">
        <div>
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
            <CalendarDays className="h-7 w-7 text-slate-400" />
          </div>

          <h3 className="mt-4 text-lg font-semibold text-slate-800">
            No tasks found
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Try changing your filters or create a new task.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="border-b border-slate-200 bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Task
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Priority
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Status
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Due Date
              </th>

              <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {tasks.map((task) => (
              <tr
                key={task.id}
                onClick={() => onView(task)}
                className="cursor-pointer transition hover:bg-slate-50"
              >
                <td className="px-6 py-4">
                  <p className="font-semibold text-slate-800">
                    {task.title}
                  </p>

                  <p className="mt-1 max-w-md truncate text-sm text-slate-500">
                    {task.description ||
                      "No description provided"}
                  </p>
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                      priorityStyles[task.priority]
                    }`}
                  >
                    {formatLabel(task.priority)}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                      statusStyles[task.status]
                    }`}
                  >
                    {formatLabel(task.status)}
                  </span>
                </td>

                <td className="px-6 py-4 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-slate-400" />

                    {dayjs(task.dueDate).format(
                      "DD MMM YYYY"
                    )}
                  </div>
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        onEdit(task);
                      }}
                      className="rounded-lg p-2 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600"
                      aria-label="Edit task"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>

                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        onDelete(task);
                      }}
                      className="rounded-lg p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600"
                      aria-label="Delete task"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TaskTable;