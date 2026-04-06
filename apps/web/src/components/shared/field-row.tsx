type FieldRowProps = {
  label: string;
  value?: string;
};

export function FieldRow({ label, value }: FieldRowProps) {
  return (
    <div className="rounded-2xl border border-slate-200 p-4">
      <div className="text-sm font-medium text-slate-500">{label}</div>
      <div className="mt-2 text-sm font-semibold text-slate-900">
        {value ?? "—"}
      </div>
    </div>
  );
}