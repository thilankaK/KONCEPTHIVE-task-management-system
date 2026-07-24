// // import DashboardLayout from "../layouts/DashboardLayout";

// // function Dashboard() {
// //   return (
// //     <DashboardLayout>
// //       <div>
// //         <div className="mb-8">
// //           <h1 className="text-3xl font-bold text-slate-900">
// //             Dashboard
// //           </h1>

// //           <p className="mt-2 text-slate-500">
// //             Monitor your tasks and productivity.
// //           </p>
// //         </div>

// //         <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
// //           <h2 className="text-xl font-semibold text-slate-800">
// //             Dashboard content
// //           </h2>

// //           <p className="mt-2 text-slate-500">
// //             Statistics cards and task management content will appear here.
// //           </p>
// //         </div>
// //       </div>
// //     </DashboardLayout>
// //   );
// // }

// // export default Dashboard;








// import { useEffect, useState } from "react";
// import {
//   AlertTriangle,
//   CheckCircle2,
//   CircleDashed,
//   ClipboardList,
//   LoaderCircle,
//   Timer,
// } from "lucide-react";
// import toast from "react-hot-toast";

// import { getDashboardStats } from "../api/task.api";
// import StatCard from "../components/dashboard/StatCard";
// import DashboardLayout from "../layouts/DashboardLayout";
// import type { DashboardStats } from "../types/task.types";

// const initialStats: DashboardStats = {
//   totalTasks: 0,
//   pendingTasks: 0,
//   inProgressTasks: 0,
//   completedTasks: 0,
//   overdueTasks: 0,
// };

// function Dashboard() {
//   const [stats, setStats] =
//     useState<DashboardStats>(initialStats);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const loadDashboardStats = async () => {
//       try {
//         const response = await getDashboardStats();
//         setStats(response.data);
//       } catch (error) {
//         console.error("Dashboard statistics error:", error);
//         toast.error("Unable to load dashboard statistics.");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     loadDashboardStats();
//   }, []);

//   const cards = [
//     {
//       title: "Total Tasks",
//       value: stats.totalTasks,
//       icon: ClipboardList,
//       iconClassName: "text-blue-600",
//       iconBackgroundClassName: "bg-blue-100",
//     },
//     {
//       title: "Pending",
//       value: stats.pendingTasks,
//       icon: CircleDashed,
//       iconClassName: "text-amber-600",
//       iconBackgroundClassName: "bg-amber-100",
//     },
//     {
//       title: "In Progress",
//       value: stats.inProgressTasks,
//       icon: Timer,
//       iconClassName: "text-violet-600",
//       iconBackgroundClassName: "bg-violet-100",
//     },
//     {
//       title: "Completed",
//       value: stats.completedTasks,
//       icon: CheckCircle2,
//       iconClassName: "text-emerald-600",
//       iconBackgroundClassName: "bg-emerald-100",
//     },
//     {
//       title: "Overdue",
//       value: stats.overdueTasks,
//       icon: AlertTriangle,
//       iconClassName: "text-red-600",
//       iconBackgroundClassName: "bg-red-100",
//     },
//   ];

//   return (
//     <DashboardLayout>
//       <div>
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-slate-900">
//             Dashboard
//           </h1>

//           <p className="mt-2 text-slate-500">
//             Monitor your tasks and productivity.
//           </p>
//         </div>

//         {isLoading ? (
//           <div className="flex min-h-52 items-center justify-center rounded-2xl border border-slate-200 bg-white">
//             <div className="text-center">
//               <LoaderCircle className="mx-auto h-8 w-8 animate-spin text-blue-600" />
//               <p className="mt-3 text-sm text-slate-500">
//                 Loading dashboard statistics...
//               </p>
//             </div>
//           </div>
//         ) : (
//           <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-5">
//             {cards.map((card) => (
//               <StatCard
//                 key={card.title}
//                 title={card.title}
//                 value={card.value}
//                 icon={card.icon}
//                 iconClassName={card.iconClassName}
//                 iconBackgroundClassName={
//                   card.iconBackgroundClassName
//                 }
//               />
//             ))}
//           </div>
//         )}

//         <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
//           <h2 className="text-xl font-semibold text-slate-800">
//             Task Management
//           </h2>

//           <p className="mt-2 text-slate-500">
//             Your task list, search controls, filters, and task actions
//             will appear here.
//           </p>
//         </div>
//       </div>
//     </DashboardLayout>
//   );
// }

// export default Dashboard;







import { useEffect, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  CircleDashed,
  ClipboardList,
  LoaderCircle,
  Timer,
} from "lucide-react";
import toast from "react-hot-toast";

import {
  getDashboardStats,
  getTasks,
} from "../api/task.api";
import DashboardCharts from "../components/dashboard/DashboardCharts";
import DashboardTasksSection from "../components/dashboard/DashboardTasksSection";
import StatCard from "../components/dashboard/StatCard";
import DashboardLayout from "../layouts/DashboardLayout";
import { useNavigate } from "react-router-dom";

import TaskDetailsModal from "../components/tasks/TaskDetailsModal";

import type {
  DashboardStats,
  Task,
} from "../types/task.types";

const initialStats: DashboardStats = {
  totalTasks: 0,
  pendingTasks: 0,
  inProgressTasks: 0,
  completedTasks: 0,
  overdueTasks: 0,
};

function Dashboard() {
  const [stats, setStats] =
    useState<DashboardStats>(initialStats);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const [selectedTask, setSelectedTask] =
    useState<Task | null>(null);


  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setIsLoading(true);

        const [statsResponse, tasksResponse] =
          await Promise.all([
            getDashboardStats(),
            getTasks({
              sortBy: "dueDate",
            }),
          ]);

        setStats(statsResponse.data);
        setTasks(tasksResponse.data);
      } catch (error) {
        console.error("Dashboard load error:", error);
        toast.error("Unable to load dashboard.");
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const cards = [
    {
      title: "Total Tasks",
      value: stats.totalTasks,
      icon: ClipboardList,
      iconClassName: "text-blue-600",
      iconBackgroundClassName: "bg-blue-100",
    },
    {
      title: "Pending",
      value: stats.pendingTasks,
      icon: CircleDashed,
      iconClassName: "text-amber-600",
      iconBackgroundClassName: "bg-amber-100",
    },
    {
      title: "In Progress",
      value: stats.inProgressTasks,
      icon: Timer,
      iconClassName: "text-violet-600",
      iconBackgroundClassName: "bg-violet-100",
    },
    {
      title: "Completed",
      value: stats.completedTasks,
      icon: CheckCircle2,
      iconClassName: "text-emerald-600",
      iconBackgroundClassName: "bg-emerald-100",
    },
    {
      title: "Overdue",
      value: stats.overdueTasks,
      icon: AlertTriangle,
      iconClassName: "text-red-600",
      iconBackgroundClassName: "bg-red-100",
    },
  ];

  const handleEditTask = (task: Task) => {
    setSelectedTask(null);

    navigate("/tasks", {
      state: {
        action: "edit",
        task,
      },
    });
  };

  const handleDeleteTask = (task: Task) => {
    setSelectedTask(null);

    navigate("/tasks", {
      state: {
        action: "delete",
        task,
      },
    });
  };

  return (
    <DashboardLayout>
      <div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Dashboard
          </h1>

          <p className="mt-2 text-slate-500">
            Monitor your tasks, deadlines and
            productivity.
          </p>
        </div>

        {isLoading ? (
          <div className="flex min-h-72 items-center justify-center rounded-2xl border border-slate-200 bg-white">
            <div className="text-center">
              <LoaderCircle className="mx-auto h-8 w-8 animate-spin text-blue-600" />

              <p className="mt-3 text-sm text-slate-500">
                Loading dashboard...
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-5">
              {cards.map((card) => (
                <StatCard
                  key={card.title}
                  title={card.title}
                  value={card.value}
                  icon={card.icon}
                  iconClassName={card.iconClassName}
                  iconBackgroundClassName={
                    card.iconBackgroundClassName
                  }
                />
              ))}
            </div>

            <DashboardCharts tasks={tasks} />

            <DashboardTasksSection
              tasks={tasks}
              onTaskClick={setSelectedTask}
            />


            <TaskDetailsModal
              task={selectedTask}
              onClose={() => setSelectedTask(null)}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
            />
          </>
          
        )}
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;