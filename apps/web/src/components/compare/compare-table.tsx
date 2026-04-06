import type { CompareRecord } from "@/types/compare";

type CompareTableProps = {
  records: CompareRecord[];
  rows: Array<{
    key: keyof CompareRecord;
    label: string;
  }>;
};

export function CompareTable({ records, rows }: CompareTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse">
        <thead className="bg-slate-50">
          <tr>
            <th className="sticky left-0 z-10 border-b border-slate-200 bg-slate-50 px-6 py-4 text-left text-sm font-semibold text-slate-700">
              Field
            </th>
            {records.map((record) => (
              <th
                key={record.payer}
                className="min-w-[280px] border-b border-slate-200 px-6 py-4 text-left"
              >
                <div className="text-base font-semibold text-slate-900">
                  {record.payer}
                </div>
                <div className="mt-1 text-xs uppercase tracking-wide text-slate-500">
                  {record.drug}
                </div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((row) => (
            <tr key={row.key} className="align-top">
              <td className="sticky left-0 z-10 border-b border-slate-200 bg-white px-6 py-5 text-sm font-medium text-slate-700">
                {row.label}
              </td>

              {records.map((record) => {
                const cell = record[row.key];

                if (
                  typeof cell !== "object" ||
                  cell === null ||
                  !("display" in cell)
                ) {
                  return (
                    <td
                      key={`${record.payer}-${String(row.key)}`}
                      className="border-b border-slate-200 px-6 py-5"
                    >
                      <div className="text-sm font-semibold text-slate-900">—</div>
                    </td>
                  );
                }

                return (
                  <td
                    key={`${record.payer}-${String(row.key)}`}
                    className="border-b border-slate-200 px-6 py-5"
                  >
                    <div className="text-sm font-semibold text-slate-900">
                      {cell.display || "—"}
                    </div>

                    {cell.evidence && cell.evidence.length > 0 ? (
                      <div className="mt-3 space-y-2">
                        {cell.evidence.map((item, index) => (
                          <div
                            key={`${item.fieldName}-${index}`}
                            className="rounded-2xl border border-slate-200 bg-slate-50 p-3"
                          >
                            <div className="flex items-center justify-between gap-3">
                              <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                                Evidence
                              </span>
                              <span className="text-xs text-slate-500">
                                {item.section ?? "Unknown section"}
                                {item.pageNumber ? ` • Page ${item.pageNumber}` : ""}
                              </span>
                            </div>
                            <p className="mt-2 text-sm leading-6 text-slate-600">
                              {item.snippet}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="mt-2 text-sm text-slate-400">
                        No evidence captured yet
                      </p>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}