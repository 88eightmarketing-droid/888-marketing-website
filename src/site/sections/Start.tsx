"use client";

import { useState, type FormEvent } from "react";
import { start } from "@/data/content";

/** The contact form: posts to /api/contact (Resend). A failure is shown as a failure, never a false success. */
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
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/img/sf/baybridge.webp" alt="" className={media.bg} loading="lazy" />
      <span className={media.tint} aria-hidden />
      <div className={layout.inner}>
        <div className={layout.copy}>
          <p className={type.eyebrow}>{start.eyebrow}</p>
          <h2 className={type.h2}>{start.title}</h2>
          <p className={type.body}>{start.text}</p>
          <p className={type.small}>{start.small}</p>
        </div>
        {state === "sent" ? (
          <div className={layout.form}><p className={type.done}>Got it.</p><p className={type.small2}>We’ll build the page and send you the link — usually the same day.</p></div>
        ) : (
          <form className={layout.form} onSubmit={submit}>
            <label className={layout.field}><span className={type.label}>Your name</span><input name="name" required autoComplete="name" className={type.input} placeholder="Jose Ramirez" /></label>
            <label className={layout.field}><span className={type.label}>Business name</span><input name="business" required autoComplete="organization" className={type.input} placeholder="Jose’s Car Wash" /></label>
            <label className={layout.field}><span className={type.label}>Email</span><input name="email" type="email" required autoComplete="email" className={type.input} placeholder="you@example.com" /></label>
            <label className={layout.field}><span className={type.label}>Phone · optional</span><input name="phone" type="tel" autoComplete="tel" className={type.input} placeholder="555 123 4567" /></label>
            <label className={layout.field}><span className={type.label}>What does your business do?</span><textarea name="message" required rows={3} className={type.input} placeholder="A sentence is plenty." /></label>
            <button disabled={state === "sending"} className={type.submit}>{state === "sending" ? "Sending…" : "Build my page"}</button>
            {state === "failed" && <p className={type.error}>That didn’t send. Message us on <a href="https://www.instagram.com/88eightmarketing/" target="_blank" rel="noreferrer" className={type.errorLink}>Instagram @88eightmarketing</a> and we’ll pick it up there.</p>}
          </form>
        )}
      </div>
    </section>
  );
}

const layout = {
  root: "relative overflow-hidden px-5 py-28 text-white md:px-10",
  inner: "relative grid gap-12 md:grid-cols-2",
  copy: "flex flex-col gap-5",
  form: "flex flex-col gap-4 self-start bg-cream p-7 text-ink md:p-10",
  field: "flex flex-col gap-1",
};

const media = {
  bg: "absolute inset-0 h-full w-full object-cover",
  tint: "absolute inset-0 bg-wine/85",
};

const type = {
  eyebrow: "text-[11px] font-semibold uppercase tracking-[0.18em] text-sand",
  h2: "font-display text-[clamp(52px,7vw,116px)] uppercase leading-[0.88]",
  body: "max-w-[440px] text-[16px] leading-relaxed text-white/85",
  small: "max-w-[440px] text-[13px] leading-relaxed text-white/60",
  small2: "text-[14px] text-muted",
  label: "text-[12px] font-medium text-muted",
  input: "border-b border-ink/25 bg-transparent py-2.5 text-[15px] outline-none placeholder:text-ink/35 focus:border-oxblood",
  submit: "mt-3 rounded-full bg-oxblood px-6 py-3.5 text-[14px] font-semibold text-white transition-transform duration-300 hover:scale-[1.03] disabled:opacity-60",
  done: "font-display text-[56px] uppercase leading-none text-oxblood",
  error: "text-[13px] text-oxblood",
  errorLink: "underline",
};
