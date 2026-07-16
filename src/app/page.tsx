import Link from "next/link";
import { committees } from "@/lib/committees";
import { createClient } from "@/lib/supabase/server";

export default async function HomePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let firstName: string | null = null;
  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("full_name")
      .eq("id", user.id)
      .single();
    firstName = profile?.full_name?.split(" ")[0] || null;
  }

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-mmunc-green">
        <div
          aria-hidden
          className="bg-dots absolute inset-0 text-white/25"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-mmunc-green"
        />
        <div className="relative mx-auto max-w-5xl px-4 py-28 text-center sm:px-6 sm:py-40">
          <span className="inline-block rounded-full border border-mmunc-gold/40 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-mmunc-gold">
            Manarat Dhaka International School and College
          </span>

          <h1 className="mt-8 font-heading text-5xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-7xl">
            Feeling{" "}
            <span className="font-script text-6xl font-bold text-mmunc-gold sm:text-8xl">
              diplomatic
            </span>
            ?
            <br />
            Join MMUNC for the true
            <br className="hidden sm:block" /> Model United Nations Experience.
          </h1>

          <p className="mx-auto mt-6 max-w-md text-base text-white/60 sm:text-lg">
            {user
              ? `Welcome back${firstName ? `, ${firstName}` : ""}!`
              : "Sign in with your account, or sign up"}
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            {user ? (
              <Link
                href="/dashboard"
                className="w-full bg-mmunc-gold px-8 py-3.5 text-center text-sm font-semibold tracking-wide text-mmunc-green-dark transition hover:bg-mmunc-gold-light sm:w-auto"
              >
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="w-full border border-mmunc-gold px-8 py-3.5 text-center text-sm font-semibold tracking-wide text-mmunc-gold transition hover:bg-mmunc-gold hover:text-mmunc-green-dark sm:w-auto"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="w-full bg-mmunc-gold px-8 py-3.5 text-center text-sm font-semibold tracking-wide text-mmunc-green-dark transition hover:bg-mmunc-gold-light sm:w-auto"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* About teaser */}
      <section className="mx-auto max-w-6xl px-4 py-28 sm:px-6">
        <div className="grid gap-16 md:grid-cols-2 md:items-center">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-mmunc-gold-dark">
              About the Club
            </span>
            <h2 className="mt-3 font-heading text-4xl font-bold tracking-tight text-mmunc-green">
              Where students become diplomats
            </h2>
            <p className="mt-5 leading-relaxed text-gray-600">
              MMUNC brings the world&apos;s toughest debates into our
              classrooms. Delegates research real global issues, represent
              nations other than their own, and negotiate resolutions the
              way diplomats do at the actual United Nations — building
              public speaking, research, and critical thinking skills that
              last far beyond the conference floor.
            </p>
            <Link
              href="/about"
              className="mt-6 inline-block text-sm font-semibold text-mmunc-green underline decoration-mmunc-gold decoration-2 underline-offset-4 hover:text-mmunc-green-light"
            >
              Learn more about our history &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-px overflow-hidden border border-mmunc-green/10 bg-mmunc-green/10">
            {[
              { label: "Active Committees", value: `${committees.length}` },
              { label: "Delegate Portfolios", value: "150+" },
              { label: "Conferences Hosted", value: "5+" },
              { label: "Awards Won", value: "20+" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white px-6 py-10 text-center"
              >
                <p className="font-heading text-5xl font-extrabold tracking-tight text-mmunc-green">
                  {stat.value}
                </p>
                <p className="mt-2 text-xs font-medium uppercase tracking-wide text-gray-500">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Committees teaser */}
      <section className="border-y border-mmunc-green/10 bg-mmunc-platinum py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-mmunc-gold-dark">
                This Year&apos;s Lineup
              </span>
              <h2 className="mt-3 font-heading text-4xl font-bold tracking-tight text-mmunc-green">
                Our Committees
              </h2>
            </div>
            <Link
              href="/committees"
              className="text-sm font-semibold text-mmunc-green underline decoration-mmunc-gold decoration-2 underline-offset-4 hover:text-mmunc-green-light"
            >
              View all committees &rarr;
            </Link>
          </div>

          <div className="mt-12 grid gap-px overflow-hidden border border-mmunc-green/10 bg-mmunc-green/10 sm:grid-cols-3">
            {committees.slice(0, 3).map((committee) => (
              <div
                key={committee.slug}
                className="group bg-white p-8 transition hover:bg-mmunc-green"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-heading text-xl font-bold tracking-tight text-mmunc-green group-hover:text-white">
                    {committee.name}
                  </h3>
                  <span className="border border-mmunc-gold/40 px-2.5 py-1 text-xs font-semibold text-mmunc-gold-dark group-hover:text-mmunc-gold">
                    {committee.level}
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-500 group-hover:text-white/60">
                  {committee.fullName}
                </p>
                <p className="mt-5 text-sm leading-relaxed text-gray-600 group-hover:text-white/80">
                  {committee.agenda}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-mmunc-green">
        <div className="mx-auto max-w-4xl px-4 py-24 text-center sm:px-6">
          <h2 className="font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl">
            {user ? "Ready for your next session?" : "Ready to make your voice heard?"}
          </h2>
          <p className="mt-4 text-white/60">
            {user
              ? "Check your committee, portfolio, and study guide."
              : "Registration is open for this year's delegates."}
          </p>
          <Link
            href={user ? "/dashboard" : "/signup"}
            className="mt-8 inline-block bg-mmunc-gold px-8 py-3.5 text-sm font-semibold tracking-wide text-mmunc-green-dark transition hover:bg-mmunc-gold-light"
          >
            {user ? "Go to Dashboard" : "Create Your Account"}
          </Link>
        </div>
      </section>
    </>
  );
}
