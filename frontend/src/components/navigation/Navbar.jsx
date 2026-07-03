import { NavLink } from "react-router-dom";

const publicLinks = [
  {
    to: "/",
    label: "Home",
  },
  {
    to: "/login",
    label: "Login",
  },
  {
    to: "/register",
    label: "Register",
  },
  {
    to: "/tasks",
    label: "Tasks",
  },
  {
    to: "/profile",
    label: "Profile",
  },
  {
    to: "/admin",
    label: "Admin",
  },
];

function getLinkClasses({ isActive }) {
  return [
    "rounded-md px-3 py-2 text-sm font-medium transition-colors",
    isActive
      ? "bg-indigo-50 text-indigo-700"
      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
  ].join(" ");
}

export default function Navbar() {
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
          {publicLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={getLinkClasses}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

      </div>
    </header>
  );
}