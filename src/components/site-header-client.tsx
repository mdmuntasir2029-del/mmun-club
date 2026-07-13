"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/committees", label: "Committees" },
  { href: "/#contact", label: "Contact" },
];

export function SiteHeaderClient({ isSignedIn }: { isSignedIn: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-mmunc-green shadow-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-heading text-lg font-bold text-white"
          onClick={() => setOpen(false)}
        >
          <Image src="/logo.png" alt="MMUNC logo" width={36} height={36} className="h-9 w-9" priority />
          <span>
            MMUNC
            <span className="hidden font-script text-xl font-bold text-mmunc-gold sm:inline">
              {" "}
              · Manarat MUN Club
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/90 transition hover:text-mmunc-gold"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {isSignedIn ? (
            <Link
              href="/dashboard"
              className="rounded-md bg-mmunc-gold px-4 py-2 text-sm font-semibold text-mmunc-green-dark transition hover:bg-mmunc-gold-light"
            >
              My Dashboard
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-medium text-white/90 transition hover:text-mmunc-gold"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="rounded-md bg-mmunc-gold px-4 py-2 text-sm font-semibold text-mmunc-green-dark transition hover:bg-mmunc-gold-light"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 items-center justify-center rounded-md text-white md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span className="sr-only">Toggle menu</span>
          {open ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-mmunc-green-dark md:hidden">
          <nav className="flex flex-col gap-1 px-4 py-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-2 text-sm font-medium text-white/90 hover:bg-white/5 hover:text-mmunc-gold"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 flex flex-col gap-2 border-t border-white/10 pt-3">
              {isSignedIn ? (
                <Link
                  href="/dashboard"
                  onClick={() => setOpen(false)}
                  className="rounded-md bg-mmunc-gold px-4 py-2 text-center text-sm font-semibold text-mmunc-green-dark"
                >
                  My Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setOpen(false)}
                    className="rounded-md px-4 py-2 text-center text-sm font-medium text-white/90 hover:bg-white/5"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setOpen(false)}
                    className="rounded-md bg-mmunc-gold px-4 py-2 text-center text-sm font-semibold text-mmunc-green-dark"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
