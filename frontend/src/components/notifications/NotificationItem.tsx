import {
  AlertTriangle,
  BellRing,
  CalendarClock,
} from "lucide-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import type {
  Notification,
  NotificationType,
} from "../../types/notification.types";

dayjs.extend(relativeTime);

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
}

const typeStyles: Record<
  NotificationType,
  {
    icon: typeof BellRing;
    iconClassName: string;
    backgroundClassName: string;
  }
> = {
  DUE_SOON: {
    icon: CalendarClock,
    iconClassName: "text-amber-600",
    backgroundClassName: "bg-amber-100",
  },
  DUE_TODAY: {
    icon: BellRing,
    iconClassName: "text-blue-600",
    backgroundClassName: "bg-blue-100",
  },
  OVERDUE: {
    icon: AlertTriangle,
    iconClassName: "text-red-600",
    backgroundClassName: "bg-red-100",
  },
};

function NotificationItem({
  notification,
  onMarkAsRead,
}: NotificationItemProps) {
  const style = typeStyles[notification.type];
  const Icon = style.icon;

  return (
    <button
      type="button"
      onClick={() => {
        if (!notification.isRead) {
          onMarkAsRead(notification.id);
        }
      }}
      className={`flex w-full gap-3 border-b border-slate-100 px-4 py-4 text-left transition last:border-b-0 hover:bg-slate-50 ${
        notification.isRead ? "bg-white" : "bg-blue-50/40"
      }`}
    >
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${style.backgroundClassName}`}
      >
        <Icon
          className={`h-5 w-5 ${style.iconClassName}`}
        />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <p className="text-sm font-semibold text-slate-800">
            {notification.title}
          </p>

          {!notification.isRead && (
            <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-600" />
          )}
        </div>

        <p className="mt-1 text-sm leading-5 text-slate-500">
          {notification.message}
        </p>

        <p className="mt-2 text-xs text-slate-400">
          {dayjs(notification.createdAt).fromNow()}
        </p>
      </div>
    </button>
  );
}

export default NotificationItem;