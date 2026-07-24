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

import type {
  ReportCharts as ReportChartsData,
} from "../../types/report.types";

interface ReportChartsProps {
  charts: ReportChartsData;
}

const STATUS_COLORS = [
  "#f59e0b",
  "#8b5cf6",
  "#10b981",
  "#ef4444",
];

const PRIORITY_COLORS = [
  "#10b981",
  "#f59e0b",
  "#ef4444",
];

const formatTrendData = (
  items: Array<{
    date: string;
    count: number;
  }>
) =>
  items.map((item) => ({
    ...item,
    formattedDate: dayjs(item.date).format(
      "DD MMM"
    ),
  }));

function ReportCharts({
  charts,
}: ReportChartsProps) {
  const creationTrend = formatTrendData(
    charts.creationTrend
  );

  const dueDateTrend = formatTrendData(
    charts.dueDateTrend
  );

  return (
    <section 
          id="report-charts-section"
        className="mt-8">
      <div className="mb-5">
        <h2 className="text-xl font-bold text-slate-900">
          Report Charts
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Visual analysis of task status,
          priorities and activity trends.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        {/* Status Distribution */}
        <article 
              id="report-status-chart"
            className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-5">
            <h3 className="text-lg font-bold text-slate-900">
              Status Distribution
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Task totals grouped by current status.
            </p>
          </div>

          <div className="h-80">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <PieChart>
                <Pie
                  data={
                    charts.statusDistribution
                  }
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="45%"
                  innerRadius={60}
                  outerRadius={105}
                  paddingAngle={4}
                >
                  {charts.statusDistribution.map(
                    (entry, index) => (
                      <Cell
                        key={entry.name}
                        fill={
                          STATUS_COLORS[
                            index %
                              STATUS_COLORS.length
                          ]
                        }
                      />
                    )
                  )}
                </Pie>

                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </article>

        {/* Priority Distribution */}
        <article 
              id="report-priority-chart"
            className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-5">
            <h3 className="text-lg font-bold text-slate-900">
              Priority Distribution
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Number of tasks by priority level.
            </p>
          </div>

          <div className="h-80">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <BarChart
                data={
                  charts.priorityDistribution
                }
              >
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
                  radius={[10, 10, 0, 0]}
                >
                  {charts.priorityDistribution.map(
                    (entry, index) => (
                      <Cell
                        key={entry.name}
                        fill={
                          PRIORITY_COLORS[
                            index %
                              PRIORITY_COLORS.length
                          ]
                        }
                      />
                    )
                  )}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </article>

        {/* Creation Trend */}
        <article 
              id="report-creation-chart"
            className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-5">
            <h3 className="text-lg font-bold text-slate-900">
              Task Creation Trend
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Number of tasks created across the
              report period.
            </p>
          </div>

          <div className="h-80">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <LineChart data={creationTrend}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                />

                <XAxis
                  dataKey="formattedDate"
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
                  dataKey="count"
                  name="Created Tasks"
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
        </article>

        {/* Due Date Trend */}
        <article 
            id="report-due-date-chart"
            className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-5">
            <h3 className="text-lg font-bold text-slate-900">
              Due Date Trend
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Distribution of task deadlines across
              the selected period.
            </p>
          </div>

          <div className="h-80">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <LineChart data={dueDateTrend}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                />

                <XAxis
                  dataKey="formattedDate"
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
                  dataKey="count"
                  name="Due Tasks"
                  stroke="#8b5cf6"
                  strokeWidth={3}
                  dot={{
                    r: 4,
                    fill: "#8b5cf6",
                  }}
                  activeDot={{
                    r: 6,
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </article>
      </div>
    </section>
  );
}

export default ReportCharts;