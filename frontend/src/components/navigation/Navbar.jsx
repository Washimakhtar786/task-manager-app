import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { MdMenu } from "react-icons/md";

import { useAuth } from "../../context/AuthContext.jsx";
import MobileMenu from "./MobileMenu.jsx";

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

  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  function handleLogout() {
    logout();

    navigate("/login", {
      replace: true,
    });
  }

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">

        {/* Logo */}

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

        {/* Mobile Menu - Login ke baad hi */}

        {!isAuthenticated && (
  <nav
    className="hidden md:flex items-center gap-2"
    aria-label="Main navigation"
  >
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
  </nav>
)}
      </div>

      {isAuthenticated && (
        <MobileMenu
          open={mobileMenuOpen}
          onClose={() =>
            setMobileMenuOpen(false)
          }
        />
      )}
    </header>
  );
}