import type { Task } from "./task.types";

export type ReportPeriod =
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "custom";

export interface ReportDetails {
  title: string;
  period: ReportPeriod;
  startDate: string;
  endDate: string;
  generatedAt: string;
}

export interface LongestPendingTask {
  id: string;
  title: string;
  status: string;
  priority: string;
  createdAt: string;
  daysPending: number;
}

export interface ReportSummary {
  totalTasks: number;
  pendingTasks: number;
  inProgressTasks: number;
  completedTasks: number;
  overdueTasks: number;

  lowPriorityTasks: number;
  mediumPriorityTasks: number;
  highPriorityTasks: number;

  completionRate: number;
  productivityScore: number;
  averageTasksPerDay: number;
  highPriorityPercentage: number;
  overduePercentage: number;

  mostCommonPriority: string | null;
  mostCommonStatus: string | null;

  reportDurationInDays: number;
  averageCompletionTimeDays: number | null;
  completedOnTime: number;
  completedLate: number;

  longestPendingTask: LongestPendingTask | null;
}

export interface DistributionChartItem {
  name: string;
  value: number;
}

export interface TrendChartItem {
  date: string;
  count: number;
}

export interface ReportCharts {
  statusDistribution: DistributionChartItem[];
  priorityDistribution: DistributionChartItem[];
  creationTrend: TrendChartItem[];
  dueDateTrend: TrendChartItem[];
}

export interface TaskReport {
  report: ReportDetails;
  summary: ReportSummary;
  charts: ReportCharts;
  tasks: Task[];
}

export interface TaskReportResponse {
  success: boolean;
  data: TaskReport;
}

export interface ReportQueryParams {
  period: ReportPeriod;
  startDate?: string;
  endDate?: string;
}