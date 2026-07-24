import {
  AlarmClock,
  CalendarRange,
  CheckCheck,
  Clock3,
  Flag,
  ListChecks,
  Target,
  TrendingUp,
  TriangleAlert,
} from "lucide-react";

import ReportMetricCard from "./ReportMetricCard";

import type {
  ReportSummary,
} from "../../types/report.types";

interface ReportAnalyticsCardsProps {
  summary: ReportSummary;
}

const formatLabel = (
  value: string | null
) => {
  if (!value) {
    return "N/A";
  }

  return value
    .toLowerCase()
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) =>
      letter.toUpperCase()
    );
};

function ReportAnalyticsCards({
  summary,
}: ReportAnalyticsCardsProps) {
  const completionTime =
    summary.averageCompletionTimeDays === null
      ? "N/A"
      : `${summary.averageCompletionTimeDays} days`;

  const cards = [
    {
      title: "Completion Rate",
      value: `${summary.completionRate}%`,
      description:
        "Completed tasks as a percentage of all tasks.",
      icon: Target,
      iconClassName: "text-emerald-600",
      iconBackgroundClassName:
        "bg-emerald-100",
    },
    {
      title: "Average Tasks / Day",
      value: summary.averageTasksPerDay,
      description:
        "Average number of tasks created per report day.",
      icon: TrendingUp,
      iconClassName: "text-blue-600",
      iconBackgroundClassName: "bg-blue-100",
    },
    {
      title: "High Priority",
      value: `${summary.highPriorityPercentage}%`,
      description:
        "Percentage of tasks marked as high priority.",
      icon: Flag,
      iconClassName: "text-red-600",
      iconBackgroundClassName: "bg-red-100",
    },
    {
      title: "Overdue Rate",
      value: `${summary.overduePercentage}%`,
      description:
        "Percentage of incomplete overdue tasks.",
      icon: TriangleAlert,
      iconClassName: "text-orange-600",
      iconBackgroundClassName:
        "bg-orange-100",
    },
    {
      title: "Common Priority",
      value: formatLabel(
        summary.mostCommonPriority
      ),
      description:
        "Most frequently assigned priority level.",
      icon: ListChecks,
      iconClassName: "text-violet-600",
      iconBackgroundClassName:
        "bg-violet-100",
    },
    {
      title: "Common Status",
      value: formatLabel(
        summary.mostCommonStatus
      ),
      description:
        "Most frequently occurring task status.",
      icon: CheckCheck,
      iconClassName: "text-cyan-600",
      iconBackgroundClassName: "bg-cyan-100",
    },
    {
      title: "Average Completion",
      value: completionTime,
      description:
        "Average time required to complete a task.",
      icon: Clock3,
      iconClassName: "text-indigo-600",
      iconBackgroundClassName:
        "bg-indigo-100",
    },
    {
      title: "Completed On Time",
      value: summary.completedOnTime,
      description:
        "Completed tasks finished before their due date.",
      icon: CheckCheck,
      iconClassName: "text-green-600",
      iconBackgroundClassName:
        "bg-green-100",
    },
    {
      title: "Completed Late",
      value: summary.completedLate,
      description:
        "Completed tasks finished after their deadline.",
      icon: AlarmClock,
      iconClassName: "text-rose-600",
      iconBackgroundClassName: "bg-rose-100",
    },
    {
      title: "Report Duration",
      value: `${summary.reportDurationInDays} days`,
      description:
        "Number of days included in this report.",
      icon: CalendarRange,
      iconClassName: "text-slate-600",
      iconBackgroundClassName:
        "bg-slate-100",
    },
  ];

  return (
    <section className="mt-8">
      <div className="mb-5">
        <h2 className="text-xl font-bold text-slate-900">
          Advanced Analytics
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Additional performance and productivity
          insights.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5">
        {cards.map((card) => (
          <ReportMetricCard
            key={card.title}
            {...card}
          />
        ))}
      </div>

      {summary.longestPendingTask && (
        <article className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-5">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-100">
              <AlarmClock className="h-5 w-5 text-amber-600" />
            </div>

            <div>
              <p className="text-sm font-semibold text-amber-800">
                Longest Active Task
              </p>

              <h3 className="mt-1 text-lg font-bold text-slate-900">
                {
                  summary.longestPendingTask
                    .title
                }
              </h3>

              <p className="mt-2 text-sm text-slate-600">
                Active for{" "}
                <strong>
                  {
                    summary.longestPendingTask
                      .daysPending
                  }{" "}
                  days
                </strong>
                , with{" "}
                {formatLabel(
                  summary.longestPendingTask
                    .priority
                )}{" "}
                priority and{" "}
                {formatLabel(
                  summary.longestPendingTask
                    .status
                )}{" "}
                status.
              </p>
            </div>
          </div>
        </article>
      )}
    </section>
  );
}

export default ReportAnalyticsCards;