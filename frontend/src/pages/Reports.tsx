import {
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  FileBarChart2,
  LoaderCircle,
} from "lucide-react";
import dayjs from "dayjs";
import toast from "react-hot-toast";

import { getTaskReport } from "../api/report.api";
import ReportAnalyticsCards from "../components/reports/ReportAnalyticsCards";
import ReportFilters from "../components/reports/ReportFilters";
import ReportSummaryCards from "../components/reports/ReportSummaryCards";
import DashboardLayout from "../layouts/DashboardLayout";

import type {
  ReportPeriod,
  TaskReport,
} from "../types/report.types";

function Reports() {
  const [period, setPeriod] =
    useState<ReportPeriod>("monthly");

  const [startDate, setStartDate] =
    useState(
      dayjs().startOf("month").format(
        "YYYY-MM-DD"
      )
    );

  const [endDate, setEndDate] =
    useState(
      dayjs().endOf("month").format(
        "YYYY-MM-DD"
      )
    );

  const [report, setReport] =
    useState<TaskReport | null>(null);

  const [isLoading, setIsLoading] =
    useState(true);

  const loadReport = useCallback(async () => {
    if (
      period === "custom" &&
      (!startDate || !endDate)
    ) {
      toast.error(
        "Select both start and end dates."
      );

      return;
    }

    if (
      period === "custom" &&
      dayjs(startDate).isAfter(
        dayjs(endDate)
      )
    ) {
      toast.error(
        "Start date cannot be after end date."
      );

      return;
    }

    try {
      setIsLoading(true);

      const response =
        await getTaskReport({
          period,
          startDate:
            period === "custom"
              ? startDate
              : undefined,
          endDate:
            period === "custom"
              ? endDate
              : undefined,
        });

      setReport(response.data);
    } catch (error) {
      console.error(
        "Load report error:",
        error
      );

      toast.error(
        "Unable to generate the report."
      );
    } finally {
      setIsLoading(false);
    }
  }, [period, startDate, endDate]);

  useEffect(() => {
    loadReport();
  }, []);

  return (
    <DashboardLayout>
      <div>
        <div className="mb-8 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-200">
                <FileBarChart2 className="h-6 w-6" />
              </div>

              <div>
                <h1 className="text-3xl font-bold text-slate-900">
                  Task Reports
                </h1>

                <p className="mt-1 text-slate-500">
                  Analyze task productivity,
                  performance and deadlines.
                </p>
              </div>
            </div>
          </div>

          {report && (
            <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-500 shadow-sm">
              Generated{" "}
              <span className="font-semibold text-slate-700">
                {dayjs(
                  report.report.generatedAt
                ).format(
                  "DD MMM YYYY, hh:mm A"
                )}
              </span>
            </div>
          )}
        </div>

        <ReportFilters
          period={period}
          startDate={startDate}
          endDate={endDate}
          isLoading={isLoading}
          onPeriodChange={setPeriod}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
          onGenerate={loadReport}
        />

        {isLoading && !report ? (
          <div className="mt-6 flex min-h-80 items-center justify-center rounded-3xl border border-slate-200 bg-white">
            <div className="text-center">
              <LoaderCircle className="mx-auto h-9 w-9 animate-spin text-blue-600" />

              <p className="mt-4 text-sm text-slate-500">
                Generating report analytics...
              </p>
            </div>
          </div>
        ) : report ? (
          <>
            <ReportSummaryCards
              summary={report.summary}
            />

            <ReportAnalyticsCards
              summary={report.summary}
            />

            <div className="mt-8 rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center">
              <h2 className="text-xl font-bold text-slate-900">
                Charts, Task Table and Exports
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                The report charts, full task table,
                PDF, CSV and Excel exports will be
                added in the next step.
              </p>
            </div>
          </>
        ) : null}
      </div>
    </DashboardLayout>
  );
}

export default Reports;