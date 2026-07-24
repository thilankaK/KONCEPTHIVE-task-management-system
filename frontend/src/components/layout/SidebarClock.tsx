import {
  CalendarDays,
  Clock3,
} from "lucide-react";

interface SidebarClockProps {
  currentDate: Date;
  collapsed: boolean;
}

function SidebarClock({
  currentDate,
  collapsed,
}: SidebarClockProps) {
  const formattedTime =
    currentDate.toLocaleTimeString(
      "en-US",
      {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }
    );

  const formattedDate =
    currentDate.toLocaleDateString(
      "en-US",
      {
        weekday: "long",
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );

  if (collapsed) {
    return (
      <div
        className="flex flex-col items-center gap-2 rounded-xl bg-slate-900 px-2 py-3"
        title={`${formattedTime} • ${formattedDate}`}
      >
        <Clock3 className="h-5 w-5 text-blue-400" />

        <span className="text-[10px] font-semibold text-slate-300">
          {currentDate.toLocaleTimeString(
            "en-US",
            {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            }
          )}
        </span>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600/15">
          <Clock3 className="h-5 w-5 text-blue-400" />
        </div>

        <div>
          <p className="text-lg font-bold tracking-wide text-white">
            {formattedTime}
          </p>

          <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-400">
            <CalendarDays className="h-3.5 w-3.5" />
            <span>{formattedDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SidebarClock;