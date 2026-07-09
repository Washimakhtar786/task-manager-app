import {
  MdDashboard,
  MdTask,
  MdPerson,
  MdAdminPanelSettings,
  MdLogout,
} from "react-icons/md";

import {
  NavLink,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "../../context/AuthContext.jsx";

export default function Sidebar() {
  const {
    user,
    isAdmin,
    logout,
  } = useAuth();

  const navigate = useNavigate();

  function handleLogout() {
    logout();

    navigate("/", {
      replace: true,
    });
  }

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
      isActive
        ? "bg-indigo-600 text-white shadow-md"
        : "text-slate-600 hover:bg-slate-100 hover:text-indigo-600"
    }`;

  return (
    <aside className="flex h-screen w-72 max-w-[85vw] flex-col border-r border-slate-200 bg-white">
      {/* Logo */}

      <div className="border-b border-slate-200 p-6">
        <h1 className="text-2xl font-extrabold text-indigo-600">
          Task Manager
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Productivity Dashboard
        </p>
      </div>

      {/* Navigation */}

      <nav className="flex-1 space-y-2 overflow-y-auto p-4">
        <NavLink
          to="/dashboard"
          end
          className={linkClass}
        >
          <MdDashboard size={22} />
          Dashboard
        </NavLink>

        <NavLink
          to="/tasks"
          className={linkClass}
        >
          <MdTask size={22} />
          My Tasks
        </NavLink>

        <NavLink
          to="/profile"
          className={linkClass}
        >
          <MdPerson size={22} />
          My Profile
        </NavLink>

        {isAdmin && (
          <NavLink
            to="/admin"
            className={linkClass}
          >
            <MdAdminPanelSettings size={22} />
            Admin
          </NavLink>
        )}
      </nav>

      {/* User */}

      <div className="border-t border-slate-200 p-4">
        <div className="mb-4 flex items-center gap-3 rounded-xl bg-slate-100 p-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-lg font-bold text-white">
            {user?.name?.charAt(0)?.toUpperCase()}
          </div>

          <div className="min-w-0">
            <p className="truncate font-semibold text-slate-900">
              {user?.name}
            </p>

            <p className="truncate text-sm text-slate-500">
              {user?.email}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-50 px-4 py-3 font-medium text-red-600 transition hover:bg-red-100"
        >
          <MdLogout size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
}