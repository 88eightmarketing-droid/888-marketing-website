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
  root: "grid gap-14 border-t border-rule px-5 py-24 md:grid-cols-12 md:px-10 md:py-36",
  copy: "flex flex-col gap-5 md:col-span-5",
  form: "flex flex-col gap-8 md:col-span-6 md:col-start-7",
  pair: "flex flex-col gap-8 sm:flex-row",
};

const type = {
  eyebrow: "text-eyebrow font-medium uppercase tracking-[0.16em] text-ink-faint",
  h2: "font-display text-[clamp(2.75rem,6vw,6rem)] leading-[0.95] tracking-[-0.025em]",
  body: "max-w-[28rem] text-[17px] leading-[1.6] text-ink-soft",
  small: "max-w-[28rem] text-[14px] leading-[1.6] text-ink-faint",
  label: "text-[12px] font-medium uppercase tracking-[0.12em] text-ink-faint",
  input: "w-full rounded-none border-0 border-b border-ink/25 bg-transparent py-2.5 text-[17px] text-ink outline-none transition-colors placeholder:text-ink/30 focus:border-ink",
  submit: "mt-2 inline-flex min-h-13 w-fit items-center gap-3 rounded-full bg-accent px-8 text-[15px] font-medium text-paper transition-colors duration-300 hover:bg-accent-deep disabled:opacity-60",
  done: "font-display text-[clamp(3rem,6vw,5rem)] leading-none",
  error: "text-[14px] text-ink",
};
