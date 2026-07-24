import { useCallback, useEffect, useState } from "react";
import {
  BellOff,
  CheckCheck,
  LoaderCircle,
} from "lucide-react";
import toast from "react-hot-toast";

import {
  getNotifications,
  markAllNotificationsAsRead,
  markNotificationAsRead,
} from "../api/notification.api";
import NotificationItem from "../components/notifications/NotificationItem";
import DashboardLayout from "../layouts/DashboardLayout";

import type { Notification } from "../types/notification.types";

function Notifications() {
  const [notifications, setNotifications] = useState<
    Notification[]
  >([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isMarkingAllRead, setIsMarkingAllRead] =
    useState(false);

  const loadNotifications = useCallback(async () => {
    try {
      setIsLoading(true);

      const response = await getNotifications();

      setNotifications(response.data);
      setUnreadCount(response.unreadCount);
    } catch (error) {
      console.error("Load notifications error:", error);
      toast.error("Unable to load notifications.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  const handleMarkAsRead = async (
    notificationId: string
  ) => {
    try {
      await markNotificationAsRead(notificationId);

      setNotifications((current) =>
        current.map((notification) =>
          notification.id === notificationId
            ? {
                ...notification,
                isRead: true,
              }
            : notification
        )
      );

      setUnreadCount((current) =>
        Math.max(current - 1, 0)
      );
    } catch (error) {
      console.error("Mark notification error:", error);
      toast.error("Unable to update notification.");
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      setIsMarkingAllRead(true);

      await markAllNotificationsAsRead();

      setNotifications((current) =>
        current.map((notification) => ({
          ...notification,
          isRead: true,
        }))
      );

      setUnreadCount(0);
      toast.success("All notifications marked as read.");
    } catch (error) {
      console.error("Mark all notifications error:", error);
      toast.error("Unable to update notifications.");
    } finally {
      setIsMarkingAllRead(false);
    }
  };

  return (
    <DashboardLayout>
      <div>
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Notifications
            </h1>

            <p className="mt-2 text-slate-500">
              View your task reminders and due-date alerts.
            </p>
          </div>

          {unreadCount > 0 && (
            <button
              type="button"
              onClick={handleMarkAllAsRead}
              disabled={isMarkingAllRead}
              className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
            >
              {isMarkingAllRead ? (
                <LoaderCircle className="h-5 w-5 animate-spin" />
              ) : (
                <CheckCheck className="h-5 w-5" />
              )}

              Mark all as read
            </button>
          )}
        </div>

        {isLoading ? (
          <div className="flex min-h-72 items-center justify-center rounded-2xl border border-slate-200 bg-white">
            <div className="text-center">
              <LoaderCircle className="mx-auto h-8 w-8 animate-spin text-blue-600" />

              <p className="mt-3 text-sm text-slate-500">
                Loading notifications...
              </p>
            </div>
          </div>
        ) : notifications.length === 0 ? (
          <div className="flex min-h-72 items-center justify-center rounded-2xl border border-slate-200 bg-white p-8 text-center">
            <div>
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
                <BellOff className="h-8 w-8 text-slate-400" />
              </div>

              <h2 className="mt-5 text-xl font-bold text-slate-900">
                No notifications yet
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Due-date reminders will appear here.
              </p>
            </div>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            {notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onMarkAsRead={handleMarkAsRead}
              />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default Notifications;