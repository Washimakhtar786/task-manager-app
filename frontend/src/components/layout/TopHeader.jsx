import {
  MdNotificationsNone,
  MdSearch,
} from "react-icons/md";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext.jsx";
import { MdMenu } from "react-icons/md";


export default function TopHeader({
  onMenuClick,
}) {
  const {
    user,
    logout,
  } = useAuth();

  const navigate = useNavigate();

  function handleLogout() {
    logout();

    navigate("/", {
      replace: true,
    });
  }

  return (
    <header className="flex items-center justify-between border-b bg-white px-4 py-4">
      {/* Left */}

      <div className="flex items-center gap-4">
        {/* Mobile Menu */}

        <button
        type="button"
        onClick={onMenuClick}
        className="rounded-lg border p-2 lg:hidden"
      >
        <MdMenu size={24} />
      </button>

        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Dashboard
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Welcome back,
            <span className="ml-1 font-semibold text-indigo-600">
              {user?.name}
            </span>
          </p>
        </div>
      </div>

      {/* Right */}

      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <MdSearch
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={20}
          />

          <input
            type="text"
            placeholder="Search..."
            className="w-72 rounded-xl border border-slate-300 py-2 pl-10 pr-4 outline-none"
          />
        </div>

        <button className="rounded-xl border border-slate-200 p-3">
          <MdNotificationsNone size={24} />
        </button>

        <button
          type="button"
          onClick={() => navigate("/profile")}
          className="hidden rounded-lg px-4 py-2 font-medium text-slate-700 hover:bg-slate-100 lg:block"
        >
          Profile
        </button>

        <button
          type="button"
          onClick={handleLogout}
          className="hidden rounded-lg bg-red-50 px-4 py-2 font-medium text-red-600 hover:bg-red-100 lg:block"
        >
          Logout
        </button>

        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-600 text-lg font-bold text-white">
          {user?.name?.charAt(0)?.toUpperCase()}
        </div>
      </div>
    </header>
  );
}