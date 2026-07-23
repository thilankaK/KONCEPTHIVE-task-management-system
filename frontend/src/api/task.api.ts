import api from "./api";

  
import type {
  DashboardStatsResponse,
  GetTasksParams,
  TaskFormData,
  TaskResponse,
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

export const createTask = async (
  data: TaskFormData
): Promise<TaskResponse> => {
  const response = await api.post<TaskResponse>(
    "/tasks",
    data
  );

  return response.data;
};

export const updateTask = async (
  taskId: string,
  data: Partial<TaskFormData>
): Promise<TaskResponse> => {
  const response = await api.put<TaskResponse>(
    `/tasks/${taskId}`,
    data
  );

  return response.data;
};

export const deleteTask = async (
  taskId: string
): Promise<{ success: boolean; message: string }> => {
  const response = await api.delete<{
    success: boolean;
    message: string;
  }>(`/tasks/${taskId}`);

  return response.data;
};