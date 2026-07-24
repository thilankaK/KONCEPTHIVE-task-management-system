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






import { useState } from "react";
import {
  Bell,
  CheckSquare,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  LogOut,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

import LogoutConfirmModal from "../common/LogoutConfirmModal";

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
  ];

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

        <nav className="flex-1 space-y-2 px-3 py-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              location.pathname === item.path;

            return (
              <button
                key={item.label}
                type="button"
                onClick={() => navigate(item.path)}
                className={`flex w-full items-center rounded-xl px-3 py-3 text-left transition ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`}
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