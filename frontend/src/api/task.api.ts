import api from "./api";

  
import type {
  DashboardStatsResponse,
  GetTasksParams,
  TasksResponse,
} from "../types/task.types";

export const getDashboardStats =
  async (): Promise<DashboardStatsResponse> => {
    const response =
      await api.get<DashboardStatsResponse>(
        "/tasks/dashboard"
      );

    return response.data;
  };

export const getTasks = async (
  params: GetTasksParams = {}
): Promise<TasksResponse> => {
  const response = await api.get<TasksResponse>(
    "/tasks",
    {
      params: {
        search: params.search || undefined,
        status: params.status || undefined,
        priority: params.priority || undefined,
        sortBy: params.sortBy || "newest",
      },
    }
  );

  return response.data;
};