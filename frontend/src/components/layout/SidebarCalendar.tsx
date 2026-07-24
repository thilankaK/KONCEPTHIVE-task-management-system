import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useMemo, useState } from "react";

interface SidebarCalendarProps {
  currentDate: Date;
}

const weekDays = [
  "Mo",
  "Tu",
  "We",
  "Th",
  "Fr",
  "Sa",
  "Su",
];

function SidebarCalendar({
  currentDate,
}: SidebarCalendarProps) {
  const [viewDate, setViewDate] =
    useState(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
      )
    );

  const calendarDays = useMemo(() => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();

    const firstDay = new Date(
      year,
      month,
      1
    );

    const lastDay = new Date(
      year,
      month + 1,
      0
    );

    const previousMonthLastDay =
      new Date(year, month, 0);

    const startDayIndex =
      firstDay.getDay() === 0
        ? 6
        : firstDay.getDay() - 1;

    const days: Array<{
      date: Date;
      isCurrentMonth: boolean;
    }> = [];

    for (
      let index = startDayIndex - 1;
      index >= 0;
      index -= 1
    ) {
      days.push({
        date: new Date(
          year,
          month - 1,
          previousMonthLastDay.getDate() -
            index
        ),
        isCurrentMonth: false,
      });
    }

    for (
      let day = 1;
      day <= lastDay.getDate();
      day += 1
    ) {
      days.push({
        date: new Date(year, month, day),
        isCurrentMonth: true,
      });
    }

    let nextMonthDay = 1;

    while (days.length < 42) {
      days.push({
        date: new Date(
          year,
          month + 1,
          nextMonthDay
        ),
        isCurrentMonth: false,
      });

      nextMonthDay += 1;
    }

    return days;
  }, [viewDate]);

  const isSameDay = (
    firstDate: Date,
    secondDate: Date
  ) =>
    firstDate.getFullYear() ===
      secondDate.getFullYear() &&
    firstDate.getMonth() ===
      secondDate.getMonth() &&
    firstDate.getDate() ===
      secondDate.getDate();

  const handlePreviousMonth = () => {
    setViewDate(
      (current) =>
        new Date(
          current.getFullYear(),
          current.getMonth() - 1,
          1
        )
    );
  };

  const handleNextMonth = () => {
    setViewDate(
      (current) =>
        new Date(
          current.getFullYear(),
          current.getMonth() + 1,
          1
        )
    );
  };

  const handleToday = () => {
    setViewDate(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
      )
    );
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-3">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={handlePreviousMonth}
          className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-800 hover:text-white"
          aria-label="Previous month"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={handleToday}
          className="text-sm font-semibold text-white"
        >
          {viewDate.toLocaleDateString(
            "en-US",
            {
              month: "long",
              year: "numeric",
            }
          )}
        </button>

        <button
          type="button"
          onClick={handleNextMonth}
          className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-800 hover:text-white"
          aria-label="Next month"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-4 grid grid-cols-7 gap-1">
        {weekDays.map((day) => (
          <div
            key={day}
            className="flex h-7 items-center justify-center text-[10px] font-semibold uppercase text-slate-500"
          >
            {day}
          </div>
        ))}

        {calendarDays.map(
          ({
            date,
            isCurrentMonth,
          }) => {
            const isToday = isSameDay(
              date,
              currentDate
            );

            return (
              <div
                key={date.toISOString()}
                className={`flex h-7 items-center justify-center rounded-lg text-[11px] font-medium ${
                  isToday
                    ? "bg-blue-600 text-white"
                    : isCurrentMonth
                      ? "text-slate-300"
                      : "text-slate-600"
                }`}
              >
                {date.getDate()}
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}

export default SidebarCalendar;