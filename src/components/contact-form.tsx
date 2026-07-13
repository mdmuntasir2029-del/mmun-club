"use client";

import { useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    if (!name || !email || !message) {
      setStatus("error");
      setErrorMessage("Please fill in every field.");
      return;
    }

    const supabase = createClient();
    const { error } = await supabase
      .from("contact_messages")
      .insert({ name, email, message });

    if (error) {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again later.");
      return;
    }

    setStatus("success");
    form.reset();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          name="name"
          type="text"
          placeholder="Your name"
          required
          className="w-full border border-white/20 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/50 focus:border-mmunc-gold focus:outline-none"
        />
        <input
          name="email"
          type="email"
          placeholder="Your email"
          required
          className="w-full border border-white/20 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/50 focus:border-mmunc-gold focus:outline-none"
        />
      </div>
      <textarea
        name="message"
        placeholder="Your message"
        required
        rows={3}
        className="w-full border border-white/20 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/50 focus:border-mmunc-gold focus:outline-none"
      />
      <button
        type="submit"
        disabled={status === "submitting"}
        className="self-start bg-mmunc-gold px-5 py-2.5 text-sm font-semibold tracking-wide text-mmunc-green-dark transition hover:bg-mmunc-gold-light disabled:opacity-60"
      >
        {status === "submitting" ? "Sending..." : "Send Message"}
      </button>
      {status === "success" && (
        <p className="text-sm text-mmunc-gold-light">
          Thanks! Your message has been sent to the secretariat.
        </p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-300">{errorMessage}</p>
      )}
    </form>
  );
}
