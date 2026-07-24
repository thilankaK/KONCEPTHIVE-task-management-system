// import { Bell, Menu } from "lucide-react";

// interface NavbarProps {
//   collapsed: boolean;
//   onToggleSidebar: () => void;
// }

// interface StoredUser {
//   name?: string;
//   email?: string;
// }

// function Navbar({
//   collapsed,
//   onToggleSidebar,
// }: NavbarProps) {
//   const storedUser = localStorage.getItem("user");

//   const user: StoredUser = storedUser
//     ? JSON.parse(storedUser)
//     : {};

//   const displayName = user.name || "Administrator";
//   const displayEmail = user.email || "admin@test.com";

//   return (
//     <header
//       className={`fixed right-0 top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white px-6 transition-all duration-300 ${
//         collapsed ? "left-20" : "left-64"
//       }`}
//     >
//       <div className="flex items-center gap-4">
//         <button
//           type="button"
//           onClick={onToggleSidebar}
//           className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 lg:hidden"
//           aria-label="Toggle sidebar"
//         >
//           <Menu className="h-5 w-5" />
//         </button>

//         <div>
//           <h2 className="text-xl font-bold text-slate-800">
//             Welcome back, {displayName} 👋
//           </h2>

//           <p className="text-sm text-slate-500">
//             Here is what is happening with your tasks today.
//           </p>
//         </div>
//       </div>

//       <div className="flex items-center gap-4">
//         <button
//           type="button"
//           className="relative rounded-full p-2 text-slate-500 transition hover:bg-slate-100"
//           aria-label="Notifications"
//         >
//           <Bell className="h-5 w-5" />
//           <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
//         </button>

//         <div className="flex items-center gap-3">
//           <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
//             {displayName.charAt(0).toUpperCase()}
//           </div>

//           <div className="hidden sm:block">
//             <p className="text-sm font-semibold text-slate-800">
//               {displayName}
//             </p>
//             <p className="text-xs text-slate-500">
//               {displayEmail}
//             </p>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }

// export default Navbar;







import { useCallback, useEffect, useRef, useState } from "react";
import { Bell, Menu } from "lucide-react";
import toast from "react-hot-toast";

import {
  getNotifications,
  markAllNotificationsAsRead,
  markNotificationAsRead,
} from "../../api/notification.api";
import NotificationDropdown from "../notifications/NotificationDropdown";

import type { Notification } from "../../types/notification.types";

interface NavbarProps {
  collapsed: boolean;
  onToggleSidebar: () => void;
}

interface StoredUser {
  name?: string;
  email?: string;
}

function Navbar({
  collapsed,
  onToggleSidebar,
}: NavbarProps) {
  const [notifications, setNotifications] = useState<
    Notification[]
  >([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isNotificationsOpen, setIsNotificationsOpen] =
    useState(false);
  const [isLoadingNotifications, setIsLoadingNotifications] =
    useState(false);
  const [isMarkingAllRead, setIsMarkingAllRead] =
    useState(false);

  const notificationContainerRef =
    useRef<HTMLDivElement | null>(null);

  const storedUser = localStorage.getItem("user");

  let user: StoredUser = {};

  try {
    user = storedUser ? JSON.parse(storedUser) : {};
  } catch {
    user = {};
  }

  const displayName = user.name || "Administrator";
  const displayEmail = user.email || "admin@test.com";

  const loadNotifications = useCallback(
    async (showLoading = false) => {
      try {
        if (showLoading) {
          setIsLoadingNotifications(true);
        }

        const response = await getNotifications();

        setNotifications(response.data);
        setUnreadCount(response.unreadCount);
      } catch (error) {
        console.error("Load notifications error:", error);

        if (showLoading) {
          toast.error("Unable to load notifications.");
        }
      } finally {
        if (showLoading) {
          setIsLoadingNotifications(false);
        }
      }
    },
    []
  );

  useEffect(() => {
    loadNotifications();

    const intervalId = window.setInterval(() => {
      loadNotifications();
    }, 60_000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [loadNotifications]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        notificationContainerRef.current &&
        !notificationContainerRef.current.contains(
          event.target as Node
        )
      ) {
        setIsNotificationsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  const handleToggleNotifications = async () => {
    const nextValue = !isNotificationsOpen;

    setIsNotificationsOpen(nextValue);

    if (nextValue) {
      await loadNotifications(true);
    }
  };

  const handleMarkAsRead = async (
    notificationId: string
  ) => {
    try {
      await markNotificationAsRead(notificationId);

      setNotifications((currentNotifications) =>
        currentNotifications.map((notification) =>
          notification.id === notificationId
            ? {
                ...notification,
                isRead: true,
              }
            : notification
        )
      );

      setUnreadCount((currentCount) =>
        Math.max(currentCount - 1, 0)
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

      setNotifications((currentNotifications) =>
        currentNotifications.map((notification) => ({
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
    <header
      className={`fixed right-0 top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white px-6 transition-all duration-300 ${
        collapsed ? "left-20" : "left-64"
      }`}
    >
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 lg:hidden"
          aria-label="Toggle sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div>
          <h2 className="text-xl font-bold text-slate-800">
            Welcome back, {displayName} 👋
          </h2>

          <p className="text-sm text-slate-500">
            Here is what is happening with your tasks today.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div
          ref={notificationContainerRef}
          className="relative"
        >
          <button
            type="button"
            onClick={handleToggleNotifications}
            className={`relative rounded-full p-2 transition ${
              isNotificationsOpen
                ? "bg-blue-50 text-blue-600"
                : "text-slate-500 hover:bg-slate-100"
            }`}
            aria-label="Notifications"
            aria-expanded={isNotificationsOpen}
          >
            <Bell className="h-5 w-5" />

            {unreadCount > 0 && (
              <span className="absolute -right-1 -top-1 flex min-h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white ring-2 ring-white">
                {unreadCount > 99 ? "99+" : unreadCount}
              </span>
            )}
          </button>

          <NotificationDropdown
            isOpen={isNotificationsOpen}
            notifications={notifications}
            unreadCount={unreadCount}
            isLoading={isLoadingNotifications}
            isMarkingAllRead={isMarkingAllRead}
            onClose={() =>
              setIsNotificationsOpen(false)
            }
            onMarkAsRead={handleMarkAsRead}
            onMarkAllAsRead={handleMarkAllAsRead}
          />
        </div>

        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
            {displayName.charAt(0).toUpperCase()}
          </div>

          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-slate-800">
              {displayName}
            </p>

            <p className="text-xs text-slate-500">
              {displayEmail}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;