import {
  MdNotificationsNone,
  MdSearch,
} from "react-icons/md";

import { useAuth } from "../../context/AuthContext.jsx";

export default function TopHeader() {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-slate-200 bg-white px-8">
      {/* Left */}

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

      {/* Right */}

      <div className="flex items-center gap-5">
        {/* Search */}

        <div className="relative hidden md:block">
          <MdSearch
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={20}
          />

          <input
            type="text"
            placeholder="Search..."
            className="w-72 rounded-xl border border-slate-300 py-2 pl-10 pr-4 outline-none transition focus:border-indigo-500"
          />
        </div>

        {/* Notification */}

        <button className="rounded-xl border border-slate-200 p-3 transition hover:bg-slate-100">
          <MdNotificationsNone size={24} />
        </button>

        {/* Avatar */}

        <div className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-2">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-600 text-lg font-bold text-white">
            {user?.name?.charAt(0)?.toUpperCase()}
          </div>

          <div className="hidden text-left md:block">
            <p className="font-semibold text-slate-900">
              {user?.name}
            </p>

            <p className="text-xs uppercase tracking-wide text-slate-500">
              {user?.role}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}