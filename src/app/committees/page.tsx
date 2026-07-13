import type { Metadata } from "next";
import { committees } from "@/lib/committees";

export const metadata: Metadata = {
  title: "Committees | MMUNC",
  description:
    "Explore MMUNC's active committees, their agendas, and downloadable study guides.",
};

const LEVEL_STYLES: Record<string, string> = {
  Beginner: "border-green-600/40 text-green-700",
  Intermediate: "border-amber-600/40 text-amber-700",
  Advanced: "border-red-600/40 text-red-700",
};

export default function CommitteesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <div className="max-w-2xl">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-mmunc-gold-dark">
          This Year&apos;s Lineup
        </span>
        <h1 className="mt-3 font-heading text-5xl font-bold tracking-tight text-mmunc-green">
          Committees
        </h1>
        <p className="mt-5 leading-relaxed text-gray-600">
          Every committee comes with a study guide prepared by our chairing
          team — download yours below to start researching your allocated
          country or portfolio.
        </p>
      </div>

      <div className="mt-16 grid gap-px overflow-hidden border border-mmunc-green/10 bg-mmunc-green/10 sm:grid-cols-2 lg:grid-cols-3">
        {committees.map((committee) => (
          <div
            key={committee.slug}
            className="flex flex-col bg-white p-8"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <h2 className="font-heading text-xl font-bold tracking-tight text-mmunc-green">
                  {committee.name}
                </h2>
                <p className="text-sm text-gray-500">{committee.fullName}</p>
              </div>
              <span
                className={`shrink-0 border px-2.5 py-1 text-xs font-semibold ${LEVEL_STYLES[committee.level]}`}
              >
                {committee.level}
              </span>
            </div>

            <p className="mt-5 flex-1 text-sm leading-relaxed text-gray-600">
              <span className="font-semibold text-mmunc-green">Agenda: </span>
              {committee.agenda}
            </p>

            <a
              href={committee.studyGuideUrl}
              download
              className="mt-8 inline-flex items-center justify-center gap-2 border border-mmunc-gold px-4 py-2.5 text-sm font-semibold tracking-wide text-mmunc-gold-dark transition hover:bg-mmunc-gold hover:text-mmunc-green-dark"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                className="h-4 w-4"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v12m0 0l-4-4m4 4l4-4M4 21h16" />
              </svg>
              Download Study Guide
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
