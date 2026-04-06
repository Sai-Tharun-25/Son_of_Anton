// apps/web/src/app/layout.tsx
import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { AppShell } from "@/components/layout/app-shell";

export const metadata: Metadata = {
  title: "PolicyLens",
  description:
    "AI-powered medical policy normalization, comparison, and change tracking.",
};

const navItems = [
  { href: "/policies", label: "Policies" },
  { href: "/compare", label: "Compare" },
  { href: "/changes", label: "Changes" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}