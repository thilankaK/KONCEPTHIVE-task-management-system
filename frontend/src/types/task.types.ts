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

export type TaskPriority = "LOW" | "MEDIUM" | "HIGH";

export type TaskStatus =
  | "PENDING"
  | "IN_PROGRESS"
  | "COMPLETED";

export type TaskSortOption =
  | "newest"
  | "oldest"
  | "dueDate";

export interface Task {
  id: string;
  title: string;
  description: string | null;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface GetTasksParams {
  search?: string;
  status?: TaskStatus | "";
  priority?: TaskPriority | "";
  sortBy?: TaskSortOption;
}

export interface TasksResponse {
  success: boolean;
  count: number;
  data: Task[];
}





export interface TaskFormData {
  title: string;
  description?: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string;
}

export interface TaskResponse {
  success: boolean;
  message: string;
  data: Task;
}