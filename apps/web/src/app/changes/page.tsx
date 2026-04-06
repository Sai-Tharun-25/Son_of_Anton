// apps/web/src/app/compare/page.tsx
import { CompareTable } from "@/components/compare/compare-table";
import { SectionHeader } from "@/components/shared/section-header";
import { StatCard } from "@/components/shared/stat-card";
import { compareRows, selectedDrug } from "@/lib/constants/compare";
import { mockCompareRecords } from "@/lib/mock/compare";
import Link from "next/link";

export default function ComparePage() {
  const evidenceCount = mockCompareRecords.reduce((acc, record) => {
    return (
      acc +
      compareRows.reduce((rowAcc, row) => {
        const cell = record[row.key];

        if (
          typeof cell === "object" &&
          cell !== null &&
          "evidence" in cell &&
          Array.isArray(cell.evidence)
        ) {
          return rowAcc + cell.evidence.length;
        }

        return rowAcc;
      }, 0)
    );
  }, 0);

  return (
    <main>
      <SectionHeader
        eyebrow="Compare"
        title="Cross-payer comparison"
        description="Compare normalized medical policy fields side by side for the same drug across multiple payers."
        rightSlot={
          <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
            <div className="text-xs uppercase tracking-wide text-slate-500">
              Selected drug
            </div>
            <div className="mt-1 text-lg font-semibold text-slate-900">
              {selectedDrug}
            </div>
          </div>
        }
      />

      <section className="mb-6 grid gap-4 md:grid-cols-3">
        <StatCard
          label="Payers compared"
          value={String(mockCompareRecords.length)}
        />
        <StatCard label="Fields aligned" value={String(compareRows.length)} />
        <StatCard label="Evidence snippets" value={String(evidenceCount)} />
      </section>

      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-slate-900">
            Side-by-side view
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            This page currently uses mock normalized data and is ready to be
            connected to the Python comparison API later.
          </p>
        </div>

        <CompareTable records={mockCompareRecords} rows={compareRows} />
      </section>

      <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Next actions</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/policies"
            className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Browse policies
          </Link>
          <Link
            href="/changes"
            className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
          >
            View changes
          </Link>
        </div>
      </section>
    </main>
  );
}