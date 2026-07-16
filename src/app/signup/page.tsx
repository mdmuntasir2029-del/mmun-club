"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";
import { AuthCard, AuthInput, AuthSelect } from "@/components/auth-card";
import { GRADE_OPTIONS } from "@/lib/grades";

const STUDENT_CODE_PATTERN = /^[0-9]{9}$/;

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<React.ReactNode>("");
  const [pendingConfirmation, setPendingConfirmation] = useState(false);

  const emailTakenError = (
    <>
      Email already registered.{" "}
      <Link href="/login" className="font-semibold underline">
        Log in
      </Link>
    </>
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const formData = new FormData(event.currentTarget);
    const fullName = String(formData.get("fullName") ?? "").trim();
    const studentId = String(formData.get("studentId") ?? "").trim();
    const grade = String(formData.get("grade") ?? "");
    const phone = String(formData.get("phone") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    if (!fullName || !studentId || !grade || !email || !password) {
      setError("Please fill in all required fields.");
      return;
    }

    if (!STUDENT_CODE_PATTERN.test(studentId)) {
      setError("Student code must be exactly 9 digits.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    setLoading(true);
    const supabase = createClient();

    const { data: alreadyTaken, error: checkError } = await supabase.rpc(
      "student_code_exists",
      { code: studentId }
    );

    if (checkError) {
      setLoading(false);
      setError("Something went wrong. Please try again.");
      return;
    }

    if (alreadyTaken) {
      setLoading(false);
      setError("This student code is already registered.");
      return;
    }

    const { data: emailTaken, error: emailCheckError } = await supabase.rpc(
      "email_has_account",
      { check_email: email }
    );

    if (emailCheckError) {
      setLoading(false);
      setError("Something went wrong. Please try again.");
      return;
    }

    if (emailTaken) {
      setLoading(false);
      setError(emailTakenError);
      return;
    }

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          student_id: studentId,
          grade,
          phone: phone || null,
        },
      },
    });

    setLoading(false);

    if (signUpError) {
      const message = signUpError.message.toLowerCase();
      if (message.includes("student_id")) {
        setError("This student code is already registered.");
      } else if (message.includes("already registered") || message.includes("already exists")) {
        setError(emailTakenError);
      } else {
        setError(signUpError.message);
      }
      return;
    }

    if (data.session) {
      router.push("/dashboard");
      router.refresh();
      return;
    }

    // Email confirmation is still enabled on this Supabase project.
    setPendingConfirmation(true);
  }

  if (pendingConfirmation) {
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
          label="Student Code (9 digits)"
          name="studentId"
          type="text"
          inputMode="numeric"
          pattern="[0-9]{9}"
          maxLength={9}
          required
          autoComplete="off"
        />
        <AuthSelect label="Current Grade (2026–2027 session)" name="grade" required defaultValue="">
          <option value="" disabled>
            Select your grade
          </option>
          {GRADE_OPTIONS.map((g) => (
            <option key={g.value} value={g.value}>
              {g.label}
            </option>
          ))}
        </AuthSelect>
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
          className="mt-2 bg-mmunc-green px-4 py-2.5 text-sm font-semibold tracking-wide text-white transition hover:bg-mmunc-green-light disabled:opacity-60"
        >
          {loading ? "Creating account..." : "Sign Up"}
        </button>
      </form>
    </AuthCard>
  );
}
