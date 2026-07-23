import { Bell, Menu } from "lucide-react";

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
  const storedUser = localStorage.getItem("user");

  const user: StoredUser = storedUser
    ? JSON.parse(storedUser)
    : {};

  const displayName = user.name || "Administrator";
  const displayEmail = user.email || "admin@test.com";

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
        <button
          type="button"
          className="relative rounded-full p-2 text-slate-500 transition hover:bg-slate-100"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
        </button>

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