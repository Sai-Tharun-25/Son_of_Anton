// apps/web/src/components/layout/app-shell.tsx
import Link from "next/link";
import type { ReactNode } from "react";

type AppShellProps = {
  children: ReactNode;
};

const navItems = [
  { href: "/policies", label: "Policies" },
  { href: "/compare", label: "Compare" },
  { href: "/changes", label: "Changes" },
];

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
          <div className="min-w-0">
            <Link href="/policies" className="block">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Hackathon Demo
              </div>
              <div className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
                PolicyLens
              </div>
            </Link>
          </div>

          <nav className="hidden items-center gap-2 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-600 lg:block">
            Mock frontend • Python backend next
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-6">
        <div className="mb-6 rounded-3xl border border-slate-200 bg-white px-6 py-5 shadow-sm">
          <div className="text-sm font-medium uppercase tracking-wide text-slate-500">
            Prototype scope
          </div>
          <p className="mt-2 text-sm leading-6 text-slate-700">
            3 to 5 policies, 2 to 3 payers, normalized coverage fields,
            side-by-side comparison, and change detection.
          </p>
        </div>

        {children}
      </div>
    </div>
  );
}