import { PolicyTable } from "@/components/policies/policy-table";
import { SectionHeader } from "@/components/shared/section-header";
import { StatCard } from "@/components/shared/stat-card";
import { mockPolicies } from "@/lib/mock/policies";

export default function PoliciesPage() {
  return (
    <main>
      <SectionHeader
        eyebrow="Policies"
        title="Policy ingestion dashboard"
        description="Browse ingested payer policies, review parse status, and drill into source documents before comparison and change detection."
        rightSlot={
          <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
            <div className="text-xs uppercase tracking-wide text-slate-500">
              Current dataset
            </div>
            <div className="mt-1 text-lg font-semibold text-slate-900">
              {mockPolicies.length} policies
            </div>
          </div>
        }
      />

      <section className="mb-6 grid gap-4 md:grid-cols-4">
        <StatCard
          label="Parsed"
          value={String(
            mockPolicies.filter((policy) => policy.parseStatus === "parsed").length
          )}
        />
        <StatCard
          label="Processing"
          value={String(
            mockPolicies.filter((policy) => policy.parseStatus === "processing")
              .length
          )}
        />
        <StatCard
          label="Payers"
          value={String(new Set(mockPolicies.map((policy) => policy.payer)).size)}
        />
        <StatCard
          label="Document shapes"
          value={String(
            new Set(mockPolicies.map((policy) => policy.documentArchetype)).size
          )}
        />
      </section>

      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-slate-900">All policies</h2>
          <p className="mt-1 text-sm text-slate-500">
            This page is wired to mock data for now. Later, swap in the Python API.
          </p>
        </div>

        <PolicyTable policies={mockPolicies} />
      </section>
    </main>
  );
}