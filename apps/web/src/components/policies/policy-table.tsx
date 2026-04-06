import Link from "next/link";
import type { PolicyListItem } from "@/types/policy";
import { StatusBadge } from "@/components/shared/status-badge";

type PolicyTableProps = {
  policies: PolicyListItem[];
};

function labelizeArchetype(archetype: PolicyListItem["documentArchetype"]) {
  switch (archetype) {
    case "single-drug":
      return "Single drug";
    case "multi-drug":
      return "Multi-drug";
    case "drug-list":
      return "Drug list";
    case "structured-policy":
      return "Structured policy";
    default:
      return archetype;
  }
}

function statusClasses(status: PolicyListItem["parseStatus"]) {
  switch (status) {
    case "parsed":
      return "bg-green-100 text-green-800";
    case "processing":
      return "bg-yellow-100 text-yellow-800";
    case "error":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

export function PolicyTable({ policies }: PolicyTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-left">
        <thead className="bg-slate-50 text-sm text-slate-600">
          <tr>
            <th className="px-6 py-3 font-medium">Payer</th>
            <th className="px-6 py-3 font-medium">Policy title</th>
            <th className="px-6 py-3 font-medium">Type</th>
            <th className="px-6 py-3 font-medium">Drugs</th>
            <th className="px-6 py-3 font-medium">Effective date</th>
            <th className="px-6 py-3 font-medium">Status</th>
            <th className="px-6 py-3 font-medium">Open</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-200 text-sm">
          {policies.map((policy) => (
            <tr key={policy.policyId} className="hover:bg-slate-50">
              <td className="px-6 py-4 font-medium text-slate-900">
                {policy.payer}
              </td>

              <td className="px-6 py-4">
                <div className="font-medium text-slate-900">
                  {policy.policyTitle}
                </div>
                <div className="mt-1 text-xs uppercase tracking-wide text-slate-500">
                  {policy.sourceType}
                </div>
              </td>

              <td className="px-6 py-4 text-slate-700">
                {labelizeArchetype(policy.documentArchetype)}
              </td>

              <td className="px-6 py-4 text-slate-700">
                <div className="flex flex-wrap gap-2">
                  {policy.drugs.map((drug) => (
                    <span
                      key={drug}
                      className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700"
                    >
                      {drug}
                    </span>
                  ))}
                </div>
              </td>

              <td className="px-6 py-4 text-slate-700">
                {policy.effectiveDate ?? "—"}
              </td>

              <td className="px-6 py-4">
                <StatusBadge status={policy.parseStatus} />
              </td>

              <td className="px-6 py-4">
                <Link
                  href={`/policy/${policy.policyId}`}
                  className="font-medium text-slate-900 underline underline-offset-4 hover:text-slate-700"
                >
                  View policy
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}