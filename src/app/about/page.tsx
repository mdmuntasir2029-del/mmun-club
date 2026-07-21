import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | MMUNC",
  description:
    "The history, mission, and secretariat of the Manarat Dhaka International School and College Model United Nations Club.",
};

const secretariat = [
  { name: "Secretary-General", role: "Oversees the entire conference and secretariat" },
  { name: "Deputy Secretary-General", role: "Supports the Secretary-General and manages logistics" },
  { name: "Director-General", role: "Leads committee operations and chairing teams" },
  { name: "USG Delegate Affairs", role: "Manages delegate registration and allocations" },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <div className="max-w-2xl">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-mmunc-gold-dark">
          About Us
        </span>
        <h1 className="mt-3 font-serif text-5xl font-bold text-mmunc-green">
          Our History
        </h1>
        <p className="mt-5 leading-relaxed text-gray-600">
          The Manarat Dhaka International School and College Model United
          Nations Club (MMUNC) was founded by a group of students who
          wanted to bring the spirit of international diplomacy into our
          school. What started as a single classroom debate exercise has
          grown into a full student-run conference, welcoming delegates
          from our own school and neighboring institutions to research,
          debate, and negotiate on the world&apos;s most pressing issues.
        </p>
        <p className="mt-4 leading-relaxed text-gray-600">
          Every year, MMUNC trains delegates in parliamentary procedure,
          public speaking, and diplomacy — culminating in an annual
          conference organized entirely by students, for students.
        </p>
      </div>

      <div className="mt-24">
        <h2 className="font-serif text-2xl font-bold text-mmunc-green">
          Faculty Advisors
        </h2>
        <div className="mt-8 grid gap-px overflow-hidden border border-mmunc-green/10 bg-mmunc-green/10 sm:grid-cols-2">
          <div className="bg-mmunc-platinum p-8">
            <p className="font-serif text-lg font-bold text-mmunc-green">
              Faculty Advisor
            </p>
            <p className="mt-2 text-sm text-gray-600">
              Oversees the club&apos;s activities, mentors the secretariat,
              and liaises with school administration.
            </p>
          </div>
          <div className="bg-mmunc-platinum p-8">
            <p className="font-serif text-lg font-bold text-mmunc-green">
              Co-Faculty Advisor
            </p>
            <p className="mt-2 text-sm text-gray-600">
              Supports conference logistics and delegate training sessions.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-24">
        <h2 className="font-serif text-2xl font-bold text-mmunc-green">
          Secretariat
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          The student leadership team responsible for running MMUNC.
        </p>
        <div className="mt-8 grid gap-px overflow-hidden border border-mmunc-green/10 bg-mmunc-green/10 sm:grid-cols-2 lg:grid-cols-4">
          {secretariat.map((member) => (
            <div
              key={member.name}
              className="bg-white p-8 text-center"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-mmunc-green text-xl font-bold text-mmunc-gold">
                {member.name
                  .split(" ")
                  .map((w) => w[0])
                  .slice(0, 2)
                  .join("")}
              </div>
              <p className="mt-4 font-serif text-sm font-bold text-mmunc-green">
                {member.name}
              </p>
              <p className="mt-1 text-xs text-gray-500">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
