"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function DashboardTabs({ isAdmin }: { isAdmin: boolean }) {
  const pathname = usePathname();

  const tabs = [
    { href: "/dashboard", label: "Overview" },
    { href: "/dashboard/events", label: "Events" },
    ...(isAdmin ? [{ href: "/dashboard/admin", label: "Admin" }] : []),
  ];

  return (
    <div className="border-b border-mmunc-green/10 bg-white">
      <nav className="mx-auto flex max-w-5xl gap-8 px-4 sm:px-6">
        {tabs.map((tab) => {
          const active =
            tab.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(tab.href);

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`border-b-2 py-4 text-sm font-semibold tracking-wide transition ${
                active
                  ? "border-mmunc-gold text-mmunc-green"
                  : "border-transparent text-gray-500 hover:text-mmunc-green"
              }`}
            >
              {tab.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
