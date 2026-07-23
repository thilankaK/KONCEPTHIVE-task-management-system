export interface DashboardStats {
  totalTasks: number;
  pendingTasks: number;
  inProgressTasks: number;
  completedTasks: number;
  overdueTasks: number;
}

export interface DashboardStatsResponse {
  success: boolean;
  data: DashboardStats;
}