"use client";

import { useState, type FormEvent } from "react";
import { start, socials } from "@/data/site";

/**
 * The contact form: posts to /api/contact (Resend). A failure is shown as a
 * failure, never a false success — the route logs `LOST ENQUIRY` with the
 * whole submission, and the visitor is pointed at Instagram.
 *
 * Real autocomplete tokens on purpose: this is the public lead form.
 */
export default function Start() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "failed">("idle");

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const r = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      setState(r.ok ? "sent" : "failed");
    } catch {
      setState("failed");
    }
  }

  return (
    <section id="start" className={layout.root}>
      <div className={layout.copy}>
        <p className={type.eyebrow}>{start.eyebrow}</p>
        <h2 className={type.h2}>{start.title}</h2>
        <p className={type.body}>{start.text}</p>
        <p className={type.small}>{start.small}</p>
      </div>

      {state === "sent" ? (
        <div className={layout.form} role="status">
          <p className={type.done}>Got it.</p>
          <p className={type.body}>Thank you. We will be in touch to set up a first conversation.</p>
        </div>
      ) : (
        <form className={layout.form} onSubmit={submit}>
          <div className={layout.pair}>
            <Field label="Your name"><input name="name" required autoComplete="name" className={type.input} /></Field>
            <Field label="Business name"><input name="business" required autoComplete="organization" className={type.input} /></Field>
          </div>
          <div className={layout.pair}>
            <Field label="Email"><input name="email" type="email" required autoComplete="email" className={type.input} /></Field>
            <Field label="Phone (optional)"><input name="phone" type="tel" autoComplete="tel" className={type.input} /></Field>
          </div>
          <Field label="About the project"><textarea name="message" required rows={4} className={type.input} placeholder="What you do, and what you want the site to change." /></Field>
          <button disabled={state === "sending"} className={type.submit}>
            {state === "sending" ? "Sending…" : "Send"}
            <span aria-hidden>→</span>
          </button>
          {state === "failed" && (
            <p className={type.error} role="alert">
              That did not send. Message us on{" "}
              <a href={socials[0].href} target="_blank" rel="noreferrer" className="underline">Instagram @88eightmarketing</a> and we will pick it up there.
            </p>
          )}
        </form>
      )}
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-1 flex-col gap-2">
      <span className={type.label}>{label}</span>
      {children}
    </label>
  );
}

const layout = {
  root: "grid gap-14 bg-night px-5 py-24 md:grid-cols-12 md:px-10 md:py-40",
  copy: "flex flex-col gap-6 md:col-span-5",
  form: "flex flex-col gap-9 md:col-span-6 md:col-start-7 md:pt-3",
  pair: "flex flex-col gap-9 sm:flex-row",
};

const type = {
  eyebrow: "font-mono text-[11px] uppercase tracking-[0.12em] text-dim",
  h2: "font-display text-[clamp(2.75rem,6.4vw,7rem)] font-medium leading-[0.92] tracking-[-0.05em] text-bone",
  body: "max-w-[28rem] text-[17px] leading-[1.6] text-bone/70",
  small: "max-w-[28rem] text-[14px] leading-[1.6] text-dim",
  label: "font-mono text-[11px] uppercase tracking-[0.12em] text-dim",
  input: "w-full rounded-none border-0 border-b border-line bg-transparent py-3 text-[18px] text-bone outline-none transition-colors placeholder:text-bone/25 focus:border-bone",
  submit: "mt-2 inline-flex min-h-14 w-fit items-center gap-4 rounded-full bg-bone px-9 font-mono text-[12px] uppercase tracking-[0.12em] text-night transition-colors duration-300 hover:bg-flare disabled:opacity-60",
  done: "font-display text-[clamp(3rem,6vw,5rem)] font-medium leading-none tracking-[-0.05em] text-bone",
  error: "text-[14px] text-bone",
};
