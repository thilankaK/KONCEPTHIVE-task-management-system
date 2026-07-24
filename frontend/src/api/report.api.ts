import api from "./api";

import type {
  ReportQueryParams,
  TaskReportResponse,
} from "../types/report.types";

export const getTaskReport = async (
  params: ReportQueryParams
): Promise<TaskReportResponse> => {
  const response =
    await api.get<TaskReportResponse>(
      "/reports/tasks",
      {
        params: {
          period: params.period,
          startDate:
            params.period === "custom"
              ? params.startDate
              : undefined,
          endDate:
            params.period === "custom"
              ? params.endDate
              : undefined,
        },
      }
    );

  return response.data;
};