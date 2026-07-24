import {
  CalendarDays,
  FileBarChart2,
  LoaderCircle,
  RefreshCw,
} from "lucide-react";

import type {
  ReportPeriod,
} from "../../types/report.types";

interface ReportFiltersProps {
  period: ReportPeriod;
  startDate: string;
  endDate: string;
  isLoading: boolean;
  onPeriodChange: (
    period: ReportPeriod
  ) => void;
  onStartDateChange: (
    value: string
  ) => void;
  onEndDateChange: (
    value: string
  ) => void;
  onGenerate: () => void;
}

function ReportFilters({
  period,
  startDate,
  endDate,
  isLoading,
  onPeriodChange,
  onStartDateChange,
  onEndDateChange,
  onGenerate,
}: ReportFiltersProps) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-end">
        <div className="flex-1">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100">
              <FileBarChart2 className="h-5 w-5 text-blue-600" />
            </div>

            <div>
              <h2 className="font-bold text-slate-900">
                Report Configuration
              </h2>

              <p className="text-sm text-slate-500">
                Choose the reporting period and
                generate updated analytics.
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="text-sm font-medium text-slate-700">
                Report Period
              </label>

              <select
                value={period}
                onChange={(event) =>
                  onPeriodChange(
                    event.target
                      .value as ReportPeriod
                  )
                }
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="daily">
                  Daily
                </option>

                <option value="weekly">
                  Weekly
                </option>

                <option value="monthly">
                  Monthly
                </option>

                <option value="yearly">
                  Yearly
                </option>

                <option value="custom">
                  Custom Range
                </option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">
                Start Date
              </label>

              <div className="relative mt-2">
                <CalendarDays className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                <input
                  type="date"
                  value={startDate}
                  onChange={(event) =>
                    onStartDateChange(
                      event.target.value
                    )
                  }
                  disabled={period !== "custom"}
                  className="w-full rounded-xl border border-slate-200 py-3 pl-12 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">
                End Date
              </label>

              <div className="relative mt-2">
                <CalendarDays className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                <input
                  type="date"
                  value={endDate}
                  min={startDate || undefined}
                  onChange={(event) =>
                    onEndDateChange(
                      event.target.value
                    )
                  }
                  disabled={period !== "custom"}
                  className="w-full rounded-xl border border-slate-200 py-3 pl-12 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400"
                />
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onGenerate}
          disabled={isLoading}
          className="flex min-w-48 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? (
            <>
              <LoaderCircle className="h-5 w-5 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <RefreshCw className="h-5 w-5" />
              Generate Report
            </>
          )}
        </button>
      </div>
    </section>
  );
}

export default ReportFilters;