import { useAuth } from "../context/AuthContext.jsx";

import PageHeader from "../components/common/PageHeader.jsx";

import DashboardLayout from "../components/layout/DashboardLayout.jsx";

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <PageHeader
        title="My Profile"
        description="Manage your account information."
      />

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <p className="text-sm font-medium text-slate-500">
              Full Name
            </p>

            <p className="mt-1 text-lg font-semibold text-slate-900">
              {user?.name}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-slate-500">
              Email
            </p>

            <p className="mt-1 text-lg font-semibold text-slate-900">
              {user?.email}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-slate-500">
              Role
            </p>

            <p className="mt-1 text-lg font-semibold text-slate-900">
              {user?.role}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-slate-500">
              Account Status
            </p>

            <p
              className={`mt-1 inline-flex rounded-full px-3 py-1 text-sm font-semibold ${
                user?.isActive
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {user?.isActive
                ? "Active"
                : "Inactive"}
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}