// import {
//   BellOff,
//   CheckCheck,
//   LoaderCircle,
//   X,
// } from "lucide-react";

// import NotificationItem from "./NotificationItem";
// import { useNavigate } from "react-router-dom";

// import type {
//   Notification,
// } from "../../types/notification.types";

// interface NotificationDropdownProps {
//   isOpen: boolean;
//   notifications: Notification[];
//   unreadCount: number;
//   isLoading: boolean;
//   isMarkingAllRead: boolean;
//   onClose: () => void;
//   onMarkAsRead: (id: string) => void;
//   onMarkAllAsRead: () => void;
// }

// function NotificationDropdown({
//   isOpen,
//   notifications,
//   unreadCount,
//   isLoading,
//   isMarkingAllRead,
//   onClose,
//   onMarkAsRead,
//   onMarkAllAsRead,
// }: NotificationDropdownProps) {
//   if (!isOpen) {
//     return null;
//   }

//   return (
//     <div className="absolute right-0 top-14 z-50 w-[calc(100vw-2rem)] max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
//       <div className="flex items-center justify-between border-b border-slate-200 px-4 py-4">
//         <div>
//           <h3 className="font-bold text-slate-900">
//             Notifications
//           </h3>

//           <p className="mt-1 text-xs text-slate-500">
//             {unreadCount > 0
//               ? `${unreadCount} unread notification${
//                   unreadCount === 1 ? "" : "s"
//                 }`
//               : "You are all caught up"}
//           </p>
//         </div>

//         <div className="flex items-center gap-2">
//           {unreadCount > 0 && (
//             <button
//               type="button"
//               onClick={onMarkAllAsRead}
//               disabled={isMarkingAllRead}
//               className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-blue-600 transition hover:bg-blue-50 disabled:opacity-60"
//             >
//               {isMarkingAllRead ? (
//                 <LoaderCircle className="h-4 w-4 animate-spin" />
//               ) : (
//                 <CheckCheck className="h-4 w-4" />
//               )}

//               <span className="hidden sm:inline">
//                 Mark all read
//               </span>
//             </button>
//           )}

//           <button
//             type="button"
//             onClick={onClose}
//             className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
//             aria-label="Close notifications"
//           >
//             <X className="h-5 w-5" />
//           </button>
//         </div>
//       </div>

//       <div className="max-h-96 overflow-y-auto">
//         {isLoading ? (
//           <div className="flex min-h-56 items-center justify-center">
//             <div className="text-center">
//               <LoaderCircle className="mx-auto h-7 w-7 animate-spin text-blue-600" />

//               <p className="mt-3 text-sm text-slate-500">
//                 Loading notifications...
//               </p>
//             </div>
//           </div>
//         ) : notifications.length === 0 ? (
//           <div className="flex min-h-56 items-center justify-center p-8 text-center">
//             <div>
//               <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
//                 <BellOff className="h-7 w-7 text-slate-400" />
//               </div>

//               <h4 className="mt-4 font-semibold text-slate-800">
//                 No notifications
//               </h4>

//               <p className="mt-2 text-sm text-slate-500">
//                 Due date reminders will appear here.
//               </p>
//             </div>
//           </div>
//         ) : (
//           notifications.map((notification) => (
//             <NotificationItem
//               key={notification.id}
//               notification={notification}
//               onMarkAsRead={onMarkAsRead}
//             />
//           ))
//         )}
//       </div>
//     </div>
//   );
// }

// export default NotificationDropdown;





import {
  BellOff,
  CheckCheck,
  LoaderCircle,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import NotificationItem from "./NotificationItem";

import type { Notification } from "../../types/notification.types";

interface NotificationDropdownProps {
  isOpen: boolean;
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  isMarkingAllRead: boolean;
  onClose: () => void;
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
}

function NotificationDropdown({
  isOpen,
  notifications,
  unreadCount,
  isLoading,
  isMarkingAllRead,
  onClose,
  onMarkAsRead,
  onMarkAllAsRead,
}: NotificationDropdownProps) {
  const navigate = useNavigate();

  if (!isOpen) {
    return null;
  }

  const latestUnreadNotifications = notifications
    .filter((notification) => !notification.isRead)
    .slice(0, 3);

  const handleViewAll = () => {
    onClose();
    navigate("/notifications");
  };

  return (
    <div className="absolute right-0 top-14 z-50 w-[calc(100vw-2rem)] max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-4">
        <div>
          <h3 className="font-bold text-slate-900">
            Notifications
          </h3>

          <p className="mt-1 text-xs text-slate-500">
            {unreadCount > 0
              ? `${unreadCount} unread notification${
                  unreadCount === 1 ? "" : "s"
                }`
              : "You are all caught up"}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              type="button"
              onClick={onMarkAllAsRead}
              disabled={isMarkingAllRead}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-blue-600 transition hover:bg-blue-50 disabled:opacity-60"
            >
              {isMarkingAllRead ? (
                <LoaderCircle className="h-4 w-4 animate-spin" />
              ) : (
                <CheckCheck className="h-4 w-4" />
              )}

              <span className="hidden sm:inline">
                Mark all read
              </span>
            </button>
          )}

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            aria-label="Close notifications"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {isLoading ? (
          <div className="flex min-h-56 items-center justify-center">
            <div className="text-center">
              <LoaderCircle className="mx-auto h-7 w-7 animate-spin text-blue-600" />

              <p className="mt-3 text-sm text-slate-500">
                Loading notifications...
              </p>
            </div>
          </div>
        ) : latestUnreadNotifications.length === 0 ? (
          <div className="flex min-h-48 items-center justify-center p-8 text-center">
            <div>
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
                <BellOff className="h-7 w-7 text-slate-400" />
              </div>

              <h4 className="mt-4 font-semibold text-slate-800">
                No unread notifications
              </h4>

              <p className="mt-2 text-sm text-slate-500">
                You are all caught up.
              </p>
            </div>
          </div>
        ) : (
          latestUnreadNotifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onMarkAsRead={onMarkAsRead}
            />
          ))
        )}
      </div>

      <div className="border-t border-slate-200 p-3">
        <button
          type="button"
          onClick={handleViewAll}
          className="w-full rounded-xl py-2.5 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
        >
          View all notifications
        </button>
      </div>
    </div>
  );
}

export default NotificationDropdown;