type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  rightSlot?: React.ReactNode;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  rightSlot,
}: SectionHeaderProps) {
  return (
    <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <div>
        {eyebrow ? (
          <p className="text-sm font-medium text-slate-500">{eyebrow}</p>
        ) : null}
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
          {title}
        </h1>
        {description ? (
          <p className="mt-2 max-w-3xl text-sm text-slate-600">{description}</p>
        ) : null}
      </div>

      {rightSlot ? rightSlot : null}
    </div>
  );
}