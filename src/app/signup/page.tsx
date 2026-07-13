"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";
import { AuthCard, AuthInput } from "@/components/auth-card";

export default function SignupPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const formData = new FormData(event.currentTarget);
    const fullName = String(formData.get("fullName") ?? "").trim();
    const studentId = String(formData.get("studentId") ?? "").trim();
    const institution = String(formData.get("institution") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    if (!fullName || !institution || !email || !password) {
      setError("Please fill in all required fields.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    setLoading(true);
    const supabase = createClient();

    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/confirm?next=/dashboard`,
        data: {
          full_name: fullName,
          student_id: studentId || null,
          institution,
          phone: phone || null,
        },
      },
    });

    setLoading(false);

    if (signUpError) {
      setError(signUpError.message);
      return;
    }

    setSuccess(true);
  }

  if (success) {
    return (
      <AuthCard title="Check your email">
        <p className="text-sm text-gray-600">
          We&apos;ve sent a confirmation link to your email address. Click it
          to activate your account and access your delegate dashboard.
        </p>
      </AuthCard>
    );
  }

  return (
    <AuthCard
      title="Create your account"
      subtitle="Register as a delegate for MMUNC"
      footer={
        <>
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-mmunc-green hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <AuthInput label="Full Name" name="fullName" type="text" required autoComplete="name" />
        <AuthInput
          label="Student ID (if internal)"
          name="studentId"
          type="text"
          autoComplete="off"
        />
        <AuthInput
          label="Institution"
          name="institution"
          type="text"
          required
          placeholder="Manarat Dhaka International School and College"
        />
        <AuthInput label="Phone Number" name="phone" type="tel" autoComplete="tel" />
        <AuthInput label="Email" name="email" type="email" required autoComplete="email" />
        <AuthInput
          label="Password"
          name="password"
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
        />

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-2 rounded-md bg-mmunc-green px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-mmunc-green-light disabled:opacity-60"
        >
          {loading ? "Creating account..." : "Sign Up"}
        </button>
      </form>
    </AuthCard>
  );
}
