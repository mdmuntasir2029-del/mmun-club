import Link from "next/link";
import { committees } from "@/lib/committees";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-mmunc-green">
        <div
          aria-hidden
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, white 1px, transparent 1px), radial-gradient(circle at 80% 60%, white 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="relative mx-auto max-w-4xl px-4 py-24 text-center sm:px-6 sm:py-32">
          <span className="inline-block rounded-full border border-mmunc-gold/50 bg-mmunc-gold/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-mmunc-gold">
            Manarat Dhaka International School and College
          </span>

          <h1 className="mt-6 font-heading text-4xl font-extrabold leading-tight text-white sm:text-5xl">
            Feeling{" "}
            <span className="font-script text-5xl font-bold text-mmunc-gold sm:text-6xl">
              diplomatic
            </span>
            ?
            <br />
            Join MMUNC for the true Model United Nations Experience.
          </h1>

          <p className="mt-4 text-base text-white/80 sm:text-lg">
            Sign in with your account, or sign up
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/login"
              className="w-full rounded-md border-2 border-mmunc-gold px-8 py-3 text-center text-sm font-semibold text-mmunc-gold transition hover:bg-mmunc-gold hover:text-mmunc-green-dark sm:w-auto"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="w-full rounded-md bg-mmunc-gold px-8 py-3 text-center text-sm font-semibold text-mmunc-green-dark transition hover:bg-mmunc-gold-light sm:w-auto"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </section>

      {/* About teaser */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-mmunc-gold-dark">
              About the Club
            </span>
            <h2 className="mt-2 font-heading text-3xl font-bold text-mmunc-green">
              Where students become diplomats
            </h2>
            <p className="mt-4 leading-relaxed text-gray-600">
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
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Active Committees", value: `${committees.length}` },
              { label: "Delegate Portfolios", value: "150+" },
              { label: "Conferences Hosted", value: "5+" },
              { label: "Awards Won", value: "20+" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-mmunc-green/10 bg-mmunc-platinum p-6 text-center"
              >
                <p className="font-heading text-3xl font-extrabold text-mmunc-green">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs font-medium uppercase tracking-wide text-gray-500">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Committees teaser */}
      <section className="bg-mmunc-platinum py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="text-sm font-semibold uppercase tracking-wider text-mmunc-gold-dark">
                This Year&apos;s Lineup
              </span>
              <h2 className="mt-2 font-heading text-3xl font-bold text-mmunc-green">
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

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {committees.slice(0, 3).map((committee) => (
              <div
                key={committee.slug}
                className="rounded-xl border border-mmunc-green/10 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-heading text-xl font-bold text-mmunc-green">
                    {committee.name}
                  </h3>
                  <span className="rounded-full bg-mmunc-gold/10 px-3 py-1 text-xs font-semibold text-mmunc-gold-dark">
                    {committee.level}
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-500">{committee.fullName}</p>
                <p className="mt-4 text-sm leading-relaxed text-gray-600">
                  {committee.agenda}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-mmunc-green">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
          <h2 className="font-heading text-3xl font-bold text-white">
            Ready to make your voice heard?
          </h2>
          <p className="mt-3 text-white/80">
            Registration is open for this year&apos;s delegates.
          </p>
          <Link
            href="/signup"
            className="mt-6 inline-block rounded-md bg-mmunc-gold px-8 py-3 text-sm font-semibold text-mmunc-green-dark transition hover:bg-mmunc-gold-light"
          >
            Create Your Account
          </Link>
        </div>
      </section>
    </>
  );
}
