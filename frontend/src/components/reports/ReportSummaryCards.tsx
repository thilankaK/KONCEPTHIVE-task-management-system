import {
  AlertTriangle,
  CheckCircle2,
  CircleDashed,
  ClipboardList,
  Gauge,
  Timer,
} from "lucide-react";

import ReportMetricCard from "./ReportMetricCard";

import type {
  ReportSummary,
} from "../../types/report.types";

interface ReportSummaryCardsProps {
  summary: ReportSummary;
}

function ReportSummaryCards({
  summary,
}: ReportSummaryCardsProps) {
  const cards = [
    {
      title: "Total Tasks",
      value: summary.totalTasks,
      description:
        "Tasks created within the selected period.",
      icon: ClipboardList,
      iconClassName: "text-blue-600",
      iconBackgroundClassName: "bg-blue-100",
    },
    {
      title: "Pending",
      value: summary.pendingTasks,
      description:
        "Tasks that have not started yet.",
      icon: CircleDashed,
      iconClassName: "text-amber-600",
      iconBackgroundClassName: "bg-amber-100",
    },
    {
      title: "In Progress",
      value: summary.inProgressTasks,
      description:
        "Tasks currently being worked on.",
      icon: Timer,
      iconClassName: "text-violet-600",
      iconBackgroundClassName:
        "bg-violet-100",
    },
    {
      title: "Completed",
      value: summary.completedTasks,
      description:
        "Tasks successfully completed.",
      icon: CheckCircle2,
      iconClassName: "text-emerald-600",
      iconBackgroundClassName:
        "bg-emerald-100",
    },
    {
      title: "Overdue",
      value: summary.overdueTasks,
      description:
        "Incomplete tasks past their deadline.",
      icon: AlertTriangle,
      iconClassName: "text-red-600",
      iconBackgroundClassName: "bg-red-100",
    },
    {
      title: "Productivity Score",
      value: `${summary.productivityScore}%`,
      description:
        "Completion performance adjusted for overdue work.",
      icon: Gauge,
      iconClassName: "text-cyan-600",
      iconBackgroundClassName: "bg-cyan-100",
    },
  ];

  return (
    <section className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
      {cards.map((card) => (
        <ReportMetricCard
          key={card.title}
          {...card}
        />
      ))}
    </section>
  );
}

export default ReportSummaryCards;