import type { PolicyChange } from "@/types/change";

type ChangeCardProps = {
  change: PolicyChange;
};

function changeTypeClasses(changeType: PolicyChange["changeType"]) {
  switch (changeType) {
    case "added":
      return "bg-green-100 text-green-800";
    case "removed":
      return "bg-red-100 text-red-800";
    case "updated":
      return "bg-blue-100 text-blue-800";
    default:
      return "bg-slate-100 text-slate-800";
  }
}

export function ChangeCard({ change }: ChangeCardProps) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-lg font-semibold text-slate-900">
              {change.payer}
            </h2>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
              {change.drug}
            </span>
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${changeTypeClasses(
                change.changeType
              )}`}
            >
              {change.changeType}
            </span>
          </div>

          <p className="mt-3 text-sm leading-6 text-slate-600">
            {change.summary}
          </p>
        </div>

        <div className="text-sm text-slate-500">{change.effectiveDate ?? "—"}</div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-3">
        <ChangeInfoCard label="Field" value={change.fieldName} />
        <ChangeInfoCard label="Old value" value={change.oldValue ?? "—"} />
        <ChangeInfoCard label="New value" value={change.newValue ?? "—"} />
      </div>
    </article>
  );
}

function ChangeInfoCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <div className="text-sm text-slate-500">{label}</div>
      <div className="mt-2 text-sm font-semibold text-slate-900">{value}</div>
    </div>
  );
}