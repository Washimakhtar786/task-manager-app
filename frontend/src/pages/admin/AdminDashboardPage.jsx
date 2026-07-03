import PageHeader from "../../components/common/PageHeader.jsx";

export default function AdminDashboardPage() {
  return (
    <>
      <PageHeader
        title="Admin Dashboard"
        description="Manage users and monitor the application."
      />

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-slate-600">
          Admin Dashboard (Coming in Part 12)
        </p>
      </div>
    </>
  );
}