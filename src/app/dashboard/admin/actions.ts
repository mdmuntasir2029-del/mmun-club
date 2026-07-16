"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { isAdminEmail } from "@/lib/admin";

async function assertAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!isAdminEmail(user?.email)) {
    throw new Error("Not authorized");
  }
}

export async function updateDelegate(formData: FormData) {
  await assertAdmin();

  const id = String(formData.get("id") ?? "");
  const committee = String(formData.get("committee") ?? "").trim() || null;
  const country = String(formData.get("country") ?? "").trim() || null;
  const paymentStatus = String(formData.get("payment_status") ?? "pending");

  if (!id) return;

  const supabase = await createClient();
  await supabase
    .from("profiles")
    .update({ committee, country, payment_status: paymentStatus })
    .eq("id", id);

  revalidatePath("/dashboard/admin");
  revalidatePath("/dashboard");
}

export async function resetDelegatePassword(formData: FormData) {
  await assertAdmin();

  const id = String(formData.get("id") ?? "");
  const newPassword = String(formData.get("new_password") ?? "");

  if (!id || newPassword.length < 8) {
    throw new Error("Password must be at least 8 characters long.");
  }

  const adminClient = createAdminClient();
  const { error } = await adminClient.auth.admin.updateUserById(id, {
    password: newPassword,
  });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/dashboard/admin");
}

export async function setDelegateBanStatus(formData: FormData) {
  await assertAdmin();

  const id = String(formData.get("id") ?? "");
  const shouldBan = String(formData.get("ban") ?? "") === "true";

  if (!id) return;

  const adminClient = createAdminClient();
  const { error } = await adminClient.auth.admin.updateUserById(id, {
    // Supabase treats any duration string as "banned"; "none" lifts it.
    ban_duration: shouldBan ? "876000h" : "none",
  });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/dashboard/admin");
}
