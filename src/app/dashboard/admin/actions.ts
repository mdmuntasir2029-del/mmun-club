"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/admin";

export async function updateDelegate(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!isAdminEmail(user?.email)) {
    throw new Error("Not authorized");
  }

  const id = String(formData.get("id") ?? "");
  const committee = String(formData.get("committee") ?? "").trim() || null;
  const country = String(formData.get("country") ?? "").trim() || null;
  const paymentStatus = String(formData.get("payment_status") ?? "pending");

  if (!id) return;

  await supabase
    .from("profiles")
    .update({ committee, country, payment_status: paymentStatus })
    .eq("id", id);

  revalidatePath("/dashboard/admin");
  revalidatePath("/dashboard");
}
