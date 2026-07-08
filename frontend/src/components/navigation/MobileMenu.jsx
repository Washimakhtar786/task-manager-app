import { NavLink, useNavigate } from "react-router-dom";
import { MdClose } from "react-icons/md";

import { useAuth } from "../../context/AuthContext.jsx";

function getLinkClasses({ isActive }) {
  return [
    "block rounded-lg px-4 py-3 text-base font-medium transition",
    isActive
      ? "bg-indigo-50 text-indigo-600"
      : "text-slate-700 hover:bg-slate-100",
  ].join(" ");
}

export default function MobileMenu({
  open,
  onClose,
}) {
  const {
    isAuthenticated,
    isAdmin,
    logout,
  } = useAuth();

  const navigate = useNavigate();

  function handleLogout() {
    logout();
    onClose();

    navigate("/login", {
      replace: true,
    });
  }

  if (!open) {
    return null;
  }

  return (
    <>
      {/* Backdrop */}

      <div
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/40"
      />

      {/* Drawer */}

      <aside className="fixed left-0 top-0 z-50 flex h-full w-72 flex-col bg-white shadow-xl">

        <div className="flex items-center justify-between border-b p-5">

          <h2 className="text-xl font-bold">
            Menu
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-slate-100"
          >
            <MdClose size={24} />
          </button>

        </div>

        <nav className="flex-1 space-y-2 p-4">

          <NavLink
            to="/"
            end
            onClick={onClose}
            className={getLinkClasses}
          >
            Dashboard
          </NavLink>

          {isAuthenticated ? (
            <>
              <NavLink
                to="/tasks"
                onClick={onClose}
                className={getLinkClasses}
              >
                Tasks
              </NavLink>

              <NavLink
                to="/profile"
                onClick={onClose}
                className={getLinkClasses}
              >
                Profile
              </NavLink>

              {isAdmin && (
                <NavLink
                  to="/admin"
                  onClick={onClose}
                  className={getLinkClasses}
                >
                  Admin
                </NavLink>
              )}

              <button
                onClick={handleLogout}
                className="w-full rounded-lg px-4 py-3 text-left font-medium text-red-600 hover:bg-red-50"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                onClick={onClose}
                className={getLinkClasses}
              >
                Login
              </NavLink>

              <NavLink
                to="/register"
                onClick={onClose}
                className={getLinkClasses}
              >
                Register
              </NavLink>
            </>
          )}

        </nav>

      </aside>
    </>
  );
}