export default function PageHeader({
  title,
  description,
  children,
}) {
  return (
    <div className="mb-6 flex flex-col gap-3 border-b border-slate-200 pb-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          {title}
        </h1>

        {description ? (
          <p className="mt-2 text-slate-600">
            {description}
          </p>
        ) : null}
      </div>

      {children ? (
        <div>
          {children}
        </div>
      ) : null}
    </div>
  );
}