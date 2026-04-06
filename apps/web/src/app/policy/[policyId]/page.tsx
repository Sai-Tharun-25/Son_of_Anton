// apps/web/src/app/policy/[policyId]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { FieldRow } from "@/components/shared/field-row";
import { InfoCard } from "@/components/shared/info-card";
import { mockPolicyDetails } from "@/lib/mock/policies";
import type { PolicyDetail } from "@/types/policy";
import { StatusBadge } from "@/components/shared/status-badge";

function labelizeArchetype(archetype: PolicyDetail["documentArchetype"]) {
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

function statusClasses(status: PolicyDetail["parseStatus"]) {
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

type PageProps = {
  params: Promise<{ policyId: string }>;
};

export default async function PolicyDetailPage({ params }: PageProps) {
  const { policyId } = await params;
  const policy = mockPolicyDetails[policyId];

  if (!policy) {
    notFound();
  }

  return (
    <main>
      <div className="mb-6">
        <Link
          href="/policies"
          className="text-sm font-medium text-slate-600 underline underline-offset-4"
        >
          Back to policies
        </Link>
      </div>

      <div className="mb-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">{policy.payer}</p>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight text-slate-900">
              {policy.policyTitle}
            </h1>
            <p className="mt-3 max-w-3xl text-sm text-slate-600">
              {policy.summary}
            </p>
          </div>

          <StatusBadge status={policy.parseStatus} />
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-4">
          <InfoCard label="Effective date" value={policy.effectiveDate ?? "—"} />
          <InfoCard label="Source type" value={policy.sourceType.toUpperCase()} />
          <InfoCard
            label="Document shape"
            value={labelizeArchetype(policy.documentArchetype)}
          />
          <InfoCard label="Drug count" value={String(policy.drugs.length)} />
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {policy.drugs.map((drug) => (
            <span
              key={drug}
              className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
            >
              {drug}
            </span>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Extracted fields</h2>
          <p className="mt-1 text-sm text-slate-500">
            Structured policy fields that will later come from the Python extraction
            pipeline.
          </p>

          <div className="mt-6 space-y-4">
            <FieldRow
              label="Coverage status"
              value={policy.extractedFields.coverageStatus}
            />
            <FieldRow
              label="Prior authorization"
              value={policy.extractedFields.priorAuthRequired}
            />
            <FieldRow
              label="Step therapy"
              value={policy.extractedFields.stepTherapyRequired}
            />
            <FieldRow
              label="Site of care"
              value={policy.extractedFields.siteOfCare}
            />

            <div className="rounded-2xl border border-slate-200 p-4">
              <div className="text-sm font-medium text-slate-500">
                Covered indications
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {policy.extractedFields.coveredIndications &&
                policy.extractedFields.coveredIndications.length > 0 ? (
                  policy.extractedFields.coveredIndications.map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
                    >
                      {item}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-slate-400">No indications yet</span>
                )}
              </div>
            </div>
          </div>
        </section>

        <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Evidence</h2>
          <p className="mt-1 text-sm text-slate-500">
            Source snippets used to support extracted fields.
          </p>

          <div className="mt-6 space-y-4">
            {policy.evidence.length > 0 ? (
              policy.evidence.map((item, index) => (
                <div
                  key={`${item.fieldName}-${index}`}
                  className="rounded-2xl border border-slate-200 p-4"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm font-semibold capitalize text-slate-900">
                      {item.fieldName}
                    </span>
                    <span className="text-xs text-slate-500">
                      {item.section ?? "Unknown section"}
                      {item.pageNumber ? ` • Page ${item.pageNumber}` : ""}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {item.snippet}
                  </p>
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-300 p-6 text-sm text-slate-500">
                Evidence snippets will appear here once parsing and extraction
                finish.
              </div>
            )}
          </div>
        </aside>
      </div>
    </main>
  );
}