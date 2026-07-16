import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { SignOutButton } from "@/components/sign-out-button";
import { committees } from "@/lib/committees";

const PAYMENT_STYLES: Record<string, string> = {
  pending: "border-amber-600/40 text-amber-700",
  verified: "border-green-600/40 text-green-700",
  rejected: "border-red-600/40 text-red-700",
};

const PAYMENT_LABELS: Record<string, string> = {
  pending: "Pending Verification",
  verified: "Verified",
  rejected: "Rejected",
};

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?next=/dashboard");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, student_id, committee, country, payment_status, study_guide_url")
    .eq("id", user.id)
    .single();

  const assignedCommittee = committees.find(
    (c) => c.slug === profile?.committee || c.name === profile?.committee
  );
  const studyGuideUrl = profile?.study_guide_url || assignedCommittee?.studyGuideUrl;
  const paymentStatus = profile?.payment_status ?? "pending";

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <div className="flex flex-col items-start justify-between gap-4 border-b border-mmunc-green/10 pb-10 sm:flex-row sm:items-center">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-mmunc-gold-dark">
            Delegate Dashboard
          </span>
          <h1 className="mt-2 font-heading text-4xl font-bold tracking-tight text-mmunc-green">
            Welcome, {profile?.full_name || "Delegate"}
          </h1>
          {profile?.student_id && (
            <p className="mt-1 text-sm text-gray-500">Student Code: {profile.student_id}</p>
          )}
        </div>
        <SignOutButton />
      </div>

      <div className="mt-12 grid gap-px overflow-hidden border border-mmunc-green/10 bg-mmunc-green/10 sm:grid-cols-3">
        <div className="bg-mmunc-platinum p-8">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            Allocated Committee
          </p>
          <p className="mt-3 font-heading text-xl font-bold tracking-tight text-mmunc-green">
            {assignedCommittee?.name || profile?.committee || "Not yet assigned"}
          </p>
          {assignedCommittee && (
            <p className="mt-1 text-sm text-gray-600">{assignedCommittee.fullName}</p>
          )}
        </div>

        <div className="bg-mmunc-platinum p-8">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            Country / Portfolio
          </p>
          <p className="mt-3 font-heading text-xl font-bold tracking-tight text-mmunc-green">
            {profile?.country || "Not yet assigned"}
          </p>
        </div>

        <div className="bg-mmunc-platinum p-8">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            Registration Status
          </p>
          <span
            className={`mt-3 inline-block border px-3 py-1 text-sm font-semibold ${PAYMENT_STYLES[paymentStatus]}`}
          >
            {PAYMENT_LABELS[paymentStatus] ?? paymentStatus}
          </span>
        </div>
      </div>

      <div className="mt-8 border border-mmunc-green/10 bg-white p-8">
        <h2 className="font-heading text-lg font-bold tracking-tight text-mmunc-green">
          Study Guide
        </h2>
        {studyGuideUrl ? (
          <>
            <p className="mt-1 text-sm text-gray-600">
              Your committee&apos;s study guide is ready to download.
            </p>
            <a
              href={studyGuideUrl}
              download
              className="mt-5 inline-flex items-center gap-2 bg-mmunc-gold px-5 py-2.5 text-sm font-semibold tracking-wide text-mmunc-green-dark transition hover:bg-mmunc-gold-light"
            >
              Download Study Guide
            </a>
          </>
        ) : (
          <p className="mt-1 text-sm text-gray-600">
            Your study guide will appear here once you&apos;re allocated a
            committee.
          </p>
        )}
      </div>
    </div>
  );
}
