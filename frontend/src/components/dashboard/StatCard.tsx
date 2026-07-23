import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  iconClassName: string;
  iconBackgroundClassName: string;
}

function StatCard({
  title,
  value,
  icon: Icon,
  iconClassName,
  iconBackgroundClassName,
}: StatCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <p className="mt-2 text-3xl font-bold text-slate-900">
            {value}
          </p>
        </div>

        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl ${iconBackgroundClassName}`}
        >
          <Icon className={`h-6 w-6 ${iconClassName}`} />
        </div>
      </div>
    </div>
  );
}

export default StatCard;