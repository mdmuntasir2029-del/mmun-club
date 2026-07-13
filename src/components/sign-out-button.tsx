"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function SignOutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSignOut() {
    setLoading(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleSignOut}
      disabled={loading}
      className="rounded-md border border-mmunc-green px-4 py-2 text-sm font-semibold text-mmunc-green transition hover:bg-mmunc-green hover:text-white disabled:opacity-60"
    >
      {loading ? "Signing out..." : "Sign Out"}
    </button>
  );
}
