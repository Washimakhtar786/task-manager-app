import {
  MdTrendingUp,
} from "react-icons/md";

export default function StatCard({
  title,
  value,
}) {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <h2 className="mt-3 text-4xl font-bold text-slate-900">
            {value}
          </h2>
        </div>

        <div className="rounded-xl bg-indigo-100 p-4 transition group-hover:bg-indigo-600">
          <MdTrendingUp
            className="text-indigo-600 group-hover:text-white"
            size={28}
          />
        </div>
      </div>
    </div>
  );
}