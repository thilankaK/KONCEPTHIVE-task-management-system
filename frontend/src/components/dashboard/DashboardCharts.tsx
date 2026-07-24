import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import dayjs from "dayjs";

import type { Task } from "../../types/task.types";

interface DashboardChartsProps {
  tasks: Task[];
}

const STATUS_COLORS = [
  "#f59e0b",
  "#8b5cf6",
  "#10b981",
];

const PRIORITY_COLORS: Record<string, string> = {
  LOW: "#10b981",
  MEDIUM: "#f59e0b",
  HIGH: "#ef4444",
};

function DashboardCharts({
  tasks,
}: DashboardChartsProps) {
  const statusData = [
    {
      name: "Pending",
      value: tasks.filter(
        (task) => task.status === "PENDING"
      ).length,
    },
    {
      name: "In Progress",
      value: tasks.filter(
        (task) => task.status === "IN_PROGRESS"
      ).length,
    },
    {
      name: "Completed",
      value: tasks.filter(
        (task) => task.status === "COMPLETED"
      ).length,
    },
  ];

  const priorityData = [
    {
      name: "Low",
      value: tasks.filter(
        (task) => task.priority === "LOW"
      ).length,
      color: PRIORITY_COLORS.LOW,
    },
    {
      name: "Medium",
      value: tasks.filter(
        (task) => task.priority === "MEDIUM"
      ).length,
      color: PRIORITY_COLORS.MEDIUM,
    },
    {
      name: "High",
      value: tasks.filter(
        (task) => task.priority === "HIGH"
      ).length,
      color: PRIORITY_COLORS.HIGH,
    },
  ];

  const deadlineData = Array.from(
    { length: 7 },
    (_, index) => {
      const date = dayjs().add(index, "day");

      return {
        date: date.format("DD MMM"),
        tasks: tasks.filter((task) =>
          dayjs(task.dueDate).isSame(date, "day")
        ).length,
      };
    }
  );

  return (
    <div className="mt-8 grid gap-6 xl:grid-cols-3">
      {/* Status Chart */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-5">
          <h2 className="text-lg font-bold text-slate-900">
            Task Status
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Distribution of tasks by status.
          </p>
        </div>

        <div className="h-72">
          {tasks.length === 0 ? (
            <ChartEmptyState />
          ) : (
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <PieChart>
                <Pie
                  data={statusData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="45%"
                  innerRadius={55}
                  outerRadius={90}
                  paddingAngle={4}
                >
                  {statusData.map((entry, index) => (
                    <Cell
                      key={entry.name}
                      fill={
                        STATUS_COLORS[
                          index % STATUS_COLORS.length
                        ]
                      }
                    />
                  ))}
                </Pie>

                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Priority Chart */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-5">
          <h2 className="text-lg font-bold text-slate-900">
            Priority Overview
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Number of tasks by priority level.
          </p>
        </div>

        <div className="h-72">
          {tasks.length === 0 ? (
            <ChartEmptyState />
          ) : (
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <BarChart data={priorityData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                />

                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                />

                <YAxis
                  allowDecimals={false}
                  axisLine={false}
                  tickLine={false}
                />

                <Tooltip />

                <Bar
                  dataKey="value"
                  name="Tasks"
                  radius={[8, 8, 0, 0]}
                >
                  {priorityData.map((entry) => (
                    <Cell
                      key={entry.name}
                      fill={entry.color}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Deadline Chart */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-5">
          <h2 className="text-lg font-bold text-slate-900">
            Upcoming Deadlines
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Tasks due during the next seven days.
          </p>
        </div>

        <div className="h-72">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <LineChart data={deadlineData}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
              />

              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                fontSize={12}
              />

              <YAxis
                allowDecimals={false}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="tasks"
                name="Tasks"
                stroke="#2563eb"
                strokeWidth={3}
                dot={{
                  r: 4,
                  fill: "#2563eb",
                }}
                activeDot={{
                  r: 6,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function ChartEmptyState() {
  return (
    <div className="flex h-full items-center justify-center text-center">
      <div>
        <p className="font-semibold text-slate-700">
          No data available
        </p>

        <p className="mt-1 text-sm text-slate-400">
          Create tasks to view analytics.
        </p>
      </div>
    </div>
  );
}

export default DashboardCharts;