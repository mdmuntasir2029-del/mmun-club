import Link from "next/link";
import type { ReactNode } from "react";

export function AuthCard({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-mmunc-platinum px-4 py-16">
      <div className="w-full max-w-md rounded-2xl border border-mmunc-green/10 bg-white p-8 shadow-sm">
        <Link
          href="/"
          className="text-xs font-semibold uppercase tracking-wider text-mmunc-gold-dark"
        >
          MMUNC
        </Link>
        <h1 className="mt-2 font-heading text-2xl font-bold text-mmunc-green">
          {title}
        </h1>
        {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}

        <div className="mt-6">{children}</div>

        {footer && <div className="mt-6 text-center text-sm text-gray-500">{footer}</div>}
      </div>
    </div>
  );
}

export function AuthInput({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-gray-700">
        {label}
      </span>
      <input
        {...props}
        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-mmunc-green focus:outline-none focus:ring-1 focus:ring-mmunc-green"
      />
    </label>
  );
}
