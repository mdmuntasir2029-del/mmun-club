import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { isAdminEmail } from "@/lib/admin";
import { committees } from "@/lib/committees";
import { updateDelegate, resetDelegatePassword, setDelegateBanStatus } from "./actions";

type Profile = {
  id: string;
  full_name: string;
  student_id: string;
  phone: string | null;
  email: string;
  committee: string | null;
  country: string | null;
  payment_status: string;
  created_at: string;
};

export default async function AdminPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!isAdminEmail(user?.email)) {
    redirect("/dashboard");
  }

  const { data: profiles } = await supabase
    .from("profiles")
    .select("id, full_name, student_id, phone, email, committee, country, payment_status, created_at")
    .order("created_at", { ascending: false })
    .returns<Profile[]>();

  const delegates = profiles ?? [];

  const adminClient = createAdminClient();
  const { data: usersData } = await adminClient.auth.admin.listUsers({ perPage: 1000 });
  const bannedIds = new Set(
    (usersData?.users ?? [])
      .filter((u) => u.banned_until && new Date(u.banned_until) > new Date())
      .map((u) => u.id)
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-mmunc-gold-dark">
        Admin
      </span>
      <h1 className="mt-3 font-heading text-3xl font-bold tracking-tight text-mmunc-green">
        Delegates
      </h1>
      <p className="mt-2 text-sm text-gray-600">
        {delegates.length} registered {delegates.length === 1 ? "delegate" : "delegates"}.
        Assign a committee, country/portfolio, and payment status, then press
        Save on that row. Use Reset / Ban for account management.
      </p>

      <div className="mt-8 overflow-x-auto border border-mmunc-green/10">
        <table className="w-full min-w-[1400px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-mmunc-green/10 bg-mmunc-platinum text-xs font-semibold uppercase tracking-wide text-gray-500">
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Student Code</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Committee</th>
              <th className="px-4 py-3">Country / Portfolio</th>
              <th className="px-4 py-3">Payment</th>
              <th className="px-4 py-3" />
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3" />
              <th className="px-4 py-3">New Password</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {delegates.map((delegate) => {
              const formId = `delegate-${delegate.id}`;
              const pwFormId = `password-${delegate.id}`;
              const banFormId = `ban-${delegate.id}`;
              const banned = bannedIds.has(delegate.id);

              return (
                <tr key={delegate.id} className="border-b border-mmunc-green/10 align-middle last:border-0">
                  <td className="px-4 py-3 font-medium text-mmunc-green">
                    {delegate.full_name}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{delegate.email}</td>
                  <td className="px-4 py-3 text-gray-600">{delegate.student_id}</td>
                  <td className="px-4 py-3 text-gray-600">{delegate.phone || "—"}</td>
                  <td className="px-4 py-3">
                    <select
                      form={formId}
                      name="committee"
                      defaultValue={delegate.committee ?? ""}
                      className="border border-gray-300 bg-white px-2 py-1.5 text-sm text-gray-900 focus:border-mmunc-green focus:outline-none"
                    >
                      <option value="">Unassigned</option>
                      {committees.map((c) => (
                        <option key={c.slug} value={c.slug}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <input
                      form={formId}
                      type="text"
                      name="country"
                      defaultValue={delegate.country ?? ""}
                      placeholder="e.g. France"
                      className="w-32 border border-gray-300 bg-white px-2 py-1.5 text-sm text-gray-900 focus:border-mmunc-green focus:outline-none"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <select
                      form={formId}
                      name="payment_status"
                      defaultValue={delegate.payment_status}
                      className="border border-gray-300 bg-white px-2 py-1.5 text-sm text-gray-900 focus:border-mmunc-green focus:outline-none"
                    >
                      <option value="pending">Pending</option>
                      <option value="verified">Verified</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <form id={formId} action={updateDelegate}>
                      <input type="hidden" name="id" value={delegate.id} />
                      <button
                        type="submit"
                        className="bg-mmunc-gold px-3 py-1.5 text-xs font-semibold tracking-wide text-mmunc-green-dark transition hover:bg-mmunc-gold-light"
                      >
                        Save
                      </button>
                    </form>
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`border px-2.5 py-1 text-xs font-semibold ${
                        banned
                          ? "border-red-600/40 text-red-700"
                          : "border-green-600/40 text-green-700"
                      }`}
                    >
                      {banned ? "Banned" : "Active"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <form id={banFormId} action={setDelegateBanStatus}>
                      <input type="hidden" name="id" value={delegate.id} />
                      <input type="hidden" name="ban" value={(!banned).toString()} />
                      <button
                        type="submit"
                        className={`border px-3 py-1.5 text-xs font-semibold tracking-wide transition ${
                          banned
                            ? "border-green-600/40 text-green-700 hover:bg-green-600/10"
                            : "border-red-600/40 text-red-700 hover:bg-red-600/10"
                        }`}
                      >
                        {banned ? "Unban" : "Ban"}
                      </button>
                    </form>
                  </td>

                  <td className="px-4 py-3">
                    <input
                      form={pwFormId}
                      type="password"
                      name="new_password"
                      minLength={8}
                      placeholder="min. 8 characters"
                      className="w-36 border border-gray-300 bg-white px-2 py-1.5 text-sm text-gray-900 focus:border-mmunc-green focus:outline-none"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <form id={pwFormId} action={resetDelegatePassword}>
                      <input type="hidden" name="id" value={delegate.id} />
                      <button
                        type="submit"
                        className="border border-mmunc-green px-3 py-1.5 text-xs font-semibold tracking-wide text-mmunc-green transition hover:bg-mmunc-green hover:text-white"
                      >
                        Reset
                      </button>
                    </form>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {delegates.length === 0 && (
          <p className="p-8 text-center text-sm text-gray-500">
            No delegates have signed up yet.
          </p>
        )}
      </div>
    </div>
  );
}
