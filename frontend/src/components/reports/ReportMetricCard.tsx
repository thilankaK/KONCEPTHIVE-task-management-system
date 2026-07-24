import type {
  LucideIcon,
} from "lucide-react";

interface ReportMetricCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: LucideIcon;
  iconClassName: string;
  iconBackgroundClassName: string;
}

function ReportMetricCard({
  title,
  value,
  description,
  icon: Icon,
  iconClassName,
  iconBackgroundClassName,
}: ReportMetricCardProps) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <p className="mt-2 text-3xl font-bold text-slate-900">
            {value}
          </p>

          <p className="mt-2 text-xs leading-5 text-slate-400">
            {description}
          </p>
        </div>

        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${iconBackgroundClassName}`}
        >
          <Icon
            className={`h-6 w-6 ${iconClassName}`}
          />
        </div>
      </div>
    </article>
  );
}

export default ReportMetricCard;