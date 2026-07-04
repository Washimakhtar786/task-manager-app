import { NavLink, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext.jsx";

function getLinkClasses({ isActive }) {
  return [
    "rounded-md px-3 py-2 text-sm font-medium transition-colors",
    isActive
      ? "bg-indigo-50 text-indigo-700"
      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
  ].join(" ");
}

export default function Navbar() {
  const {
    isAuthenticated,
    isAdmin,
    logout,
  } = useAuth();

  const navigate = useNavigate();

  function handleLogout() {
    logout();

    navigate("/login", {
      replace: true,
    });
  }

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">

        <NavLink
          to="/"
          className="flex items-center gap-3"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-lg font-bold text-white">
            T
          </span>

          <div>
            <p className="font-bold text-slate-900">
              Task Manager
            </p>

            <p className="text-xs text-slate-500">
              Organize your work
            </p>
          </div>
        </NavLink>

        <nav
          className="flex flex-wrap items-center gap-1"
          aria-label="Main navigation"
        >
          {/* Home */}
          <NavLink
            to="/"
            end
            className={getLinkClasses}
          >
            Home
          </NavLink>

          {!isAuthenticated ? (
            <>
              <NavLink
                to="/login"
                className={getLinkClasses}
              >
                Login
              </NavLink>

              <NavLink
                to="/register"
                className={getLinkClasses}
              >
                Register
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                to="/tasks"
                className={getLinkClasses}
              >
                Tasks
              </NavLink>

              <NavLink
                to="/profile"
                className={getLinkClasses}
              >
                Profile
              </NavLink>

              {isAdmin && (
                <NavLink
                  to="/admin"
                  className={getLinkClasses}
                >
                  Admin
                </NavLink>
              )}

              <button
                type="button"
                onClick={handleLogout}
                className="rounded-md px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
              >
                Logout
              </button>
            </>
          )}
        </nav>

      </div>
    </header>
  );
}