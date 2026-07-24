// import { useState } from "react";
// import {
//   CheckSquare,
//   ChevronLeft,
//   ChevronRight,
//   LayoutDashboard,
//   LogOut,
// } from "lucide-react";
// import { useLocation, useNavigate } from "react-router-dom";

// import LogoutConfirmModal from "../common/LogoutConfirmModal";

// interface SidebarProps {
//   collapsed: boolean;
//   onToggle: () => void;
// }

// function Sidebar({ collapsed, onToggle }: SidebarProps) {

//   const [isLogoutModalOpen, setIsLogoutModalOpen] =
//   useState(false);

//   const navigate = useNavigate();
//   const location = useLocation();

//   const handleLogout = () => {
//   localStorage.removeItem("token");
//   localStorage.removeItem("user");

//   setIsLogoutModalOpen(false);
//   navigate("/");
// };

//   const menuItems = [
//     {
//       label: "Dashboard",
//       icon: LayoutDashboard,
//       path: "/dashboard",
//     },
//     {
//       label: "Tasks",
//       icon: CheckSquare,
//       path: "/tasks",
//     },
//   ];

//   return (
//     <aside
//       className={`fixed left-0 top-0 z-40 flex h-screen flex-col bg-slate-950 text-white transition-all duration-300 ${
//         collapsed ? "w-20" : "w-64"
//       }`}
//     >
//       <div className="flex h-20 items-center justify-between border-b border-slate-800 px-5">
//         {!collapsed && (
//           <div>
//             <h1 className="text-lg font-bold">TaskFlow</h1>
//             <p className="text-xs text-slate-400">Management System</p>
//           </div>
//         )}

//         <button
//           type="button"
//           onClick={onToggle}
//           className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
//           aria-label="Toggle sidebar"
//         >
//           {collapsed ? (
//             <ChevronRight className="h-5 w-5" />
//           ) : (
//             <ChevronLeft className="h-5 w-5" />
//           )}
//         </button>
//       </div>

//       <nav className="flex-1 space-y-2 px-3 py-6">
//         {menuItems.map((item) => {
//           const Icon = item.icon;
//           const isActive = location.pathname === item.path;

//           return (
//             <button
//               key={item.label}
//               type="button"
//               onClick={() => navigate(item.path)}
//               className={`flex w-full items-center rounded-xl px-3 py-3 text-left transition ${
//                 isActive
//                   ? "bg-blue-600 text-white"
//                   : "text-slate-400 hover:bg-slate-800 hover:text-white"
//               }`}
//             >
//               <Icon className="h-5 w-5 shrink-0" />

//               {!collapsed && (
//                 <span className="ml-3 font-medium">{item.label}</span>
//               )}
//             </button>
//           );
//         })}
//       </nav>

//       <div className="border-t border-slate-800 p-3">
//         <button
//           type="button"
//           onClick={() => setIsLogoutModalOpen(true)}
//           className="flex w-full items-center rounded-xl px-3 py-3 text-slate-400 transition hover:bg-red-500/10 hover:text-red-400"
//         >
//           <LogOut className="h-5 w-5 shrink-0" />

//           {!collapsed && (
//             <span className="ml-3 font-medium">Logout</span>
//           )}
//         </button>
//       </div>
//     </aside>
//   );
// }

// export default Sidebar;




import {
  useEffect,
  useState,
} from "react";

import {
  Bell,
  CalendarDays,
  CheckSquare,
  ChevronLeft,
  ChevronRight,
  FileBarChart2,
  LayoutDashboard,
  LogOut,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

import LogoutConfirmModal from "../common/LogoutConfirmModal";
import SidebarCalendar from "./SidebarCalendar";
import SidebarClock from "./SidebarClock";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

function Sidebar({
  collapsed,
  onToggle,
}: SidebarProps) {
  const [isLogoutModalOpen, setIsLogoutModalOpen] =
    useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setIsLogoutModalOpen(false);
    navigate("/");
  };

  const [isCalendarOpen, setIsCalendarOpen] =
    useState(false);

  const [currentDate, setCurrentDate] =
    useState(new Date());

  const menuItems = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },
    {
      label: "Tasks",
      icon: CheckSquare,
      path: "/tasks",
    },
    {
      label: "Notifications",
      icon: Bell,
      path: "/notifications",
    },
    {
      label: "Reports",
      icon: FileBarChart2,
      path: "/reports",
    },
  ];
  useEffect(() => {
    const timerId = window.setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => {
      window.clearInterval(timerId);
    };
  }, []);

  useEffect(() => {
    if (collapsed) {
      setIsCalendarOpen(false);
    }
  }, [collapsed]);


  return (
    <>
      <aside
        className={`fixed left-0 top-0 z-40 flex h-screen flex-col bg-slate-950 text-white transition-all duration-300 ${
          collapsed ? "w-20" : "w-64"
        }`}
      >
        <div className="flex h-20 items-center justify-between border-b border-slate-800 px-5">
          {!collapsed && (
            <div>
              <h1 className="text-lg font-bold">
                TaskFlow
              </h1>

              <p className="text-xs text-slate-400">
                Management System
              </p>
            </div>
          )}

          <button
            type="button"
            onClick={onToggle}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
            aria-label="Toggle sidebar"
          >
            {collapsed ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <ChevronLeft className="h-5 w-5" />
            )}
          </button>
        </div>

        <nav
          className={`space-y-2 overflow-y-auto px-3 py-6 transition-all duration-300 ${
            isCalendarOpen
              ? "max-h-44 flex-none"
              : "flex-1"
          }`}
        >
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              location.pathname === item.path;

            return (
              <button
                key={item.label}
                type="button"
                onClick={() =>
                  navigate(item.path)
                }
                className={`flex w-full items-center rounded-xl px-3 py-3 text-left transition ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`}
                title={
                  collapsed
                    ? item.label
                    : undefined
                }
              >
                <Icon className="h-5 w-5 shrink-0" />

                {!collapsed && (
                  <span className="ml-3 font-medium">
                    {item.label}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
        
        <div className="space-y-3 px-3 pb-3">
  {!collapsed && (
    <div
      className={`grid transition-all duration-300 ${
        isCalendarOpen
          ? "grid-rows-[1fr] opacity-100"
          : "grid-rows-[0fr] opacity-0"
      }`}
    >
      <div className="overflow-hidden">
        <SidebarCalendar
          currentDate={currentDate}
        />
      </div>
    </div>
  )}

  <button
    type="button"
    onClick={() =>
      setIsCalendarOpen(
        (current) => !current
      )
    }
    className={`flex w-full items-center rounded-xl px-3 py-3 text-left transition ${
      isCalendarOpen
        ? "bg-blue-600 text-white"
        : "text-slate-400 hover:bg-slate-800 hover:text-white"
    }`}
    title={
      collapsed
        ? "Calendar"
        : undefined
    }
  >
    <CalendarDays className="h-5 w-5 shrink-0" />

    {!collapsed && (
      <>
        <span className="ml-3 flex-1 font-medium">
          Calendar
        </span>

        <ChevronRight
          className={`h-4 w-4 transition-transform duration-300 ${
            isCalendarOpen
              ? "rotate-90"
              : ""
          }`}
        />
      </>
    )}
  </button>

  <SidebarClock
    currentDate={currentDate}
    collapsed={collapsed}
  />
</div>
        <div className="border-t border-slate-800 p-3">
          <button
            type="button"
            onClick={() =>
              setIsLogoutModalOpen(true)
            }
            className="flex w-full items-center rounded-xl px-3 py-3 text-slate-400 transition hover:bg-red-500/10 hover:text-red-400"
          >
            <LogOut className="h-5 w-5 shrink-0" />

            {!collapsed && (
              <span className="ml-3 font-medium">
                Logout
              </span>
            )}
          </button>
        </div>
      </aside>

      <LogoutConfirmModal
        isOpen={isLogoutModalOpen}
        onClose={() =>
          setIsLogoutModalOpen(false)
        }
        onConfirm={handleLogout}
      />
    </>
  );
}

export default Sidebar;