import PageHeader from "../components/common/PageHeader.jsx";

export default function ProfilePage() {
  return (
    <>
      <PageHeader
        title="Profile"
        description="Manage your profile information."
      />

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-slate-600">
          Profile Page (Coming in Part 12)
        </p>
      </div>
    </>
  );
}