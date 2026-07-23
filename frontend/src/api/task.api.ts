import api from "./api";
import type {
  DashboardStatsResponse,
} from "../types/task.types";

export const getDashboardStats =
  async (): Promise<DashboardStatsResponse> => {
    const response =
      await api.get<DashboardStatsResponse>(
        "/tasks/dashboard"
      );

    return response.data;
  };