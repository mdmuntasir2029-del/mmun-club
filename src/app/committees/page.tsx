import type { Metadata } from "next";
import { committees } from "@/lib/committees";

export const metadata: Metadata = {
  title: "Committees | MMUNC",
  description:
    "Explore MMUNC's active committees, their agendas, and downloadable study guides.",
};

const LEVEL_STYLES: Record<string, string> = {
  Beginner: "bg-green-100 text-green-800",
  Intermediate: "bg-amber-100 text-amber-800",
  Advanced: "bg-red-100 text-red-800",
};

export default function CommitteesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="max-w-2xl">
        <span className="text-sm font-semibold uppercase tracking-wider text-mmunc-gold-dark">
          This Year&apos;s Lineup
        </span>
        <h1 className="mt-2 font-heading text-4xl font-bold text-mmunc-green">
          Committees
        </h1>
        <p className="mt-4 leading-relaxed text-gray-600">
          Every committee comes with a study guide prepared by our chairing
          team — download yours below to start researching your allocated
          country or portfolio.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {committees.map((committee) => (
          <div
            key={committee.slug}
            className="flex flex-col rounded-xl border border-mmunc-green/10 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <h2 className="font-heading text-xl font-bold text-mmunc-green">
                  {committee.name}
                </h2>
                <p className="text-sm text-gray-500">{committee.fullName}</p>
              </div>
              <span
                className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${LEVEL_STYLES[committee.level]}`}
              >
                {committee.level}
              </span>
            </div>

            <p className="mt-4 flex-1 text-sm leading-relaxed text-gray-600">
              <span className="font-semibold text-mmunc-green">Agenda: </span>
              {committee.agenda}
            </p>

            <a
              href={committee.studyGuideUrl}
              download
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-md border-2 border-mmunc-gold px-4 py-2 text-sm font-semibold text-mmunc-gold-dark transition hover:bg-mmunc-gold hover:text-mmunc-green-dark"
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
