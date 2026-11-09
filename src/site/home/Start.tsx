"use client";

import { useState, type FormEvent, type ReactNode } from "react";
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
    <section id="start" className="scroll-mt-14 bg-mist px-3 py-24 md:py-32">
      <div className="mx-auto max-w-[680px] text-center" data-fade>
        <h2 className="text-[40px] font-semibold leading-[1.1] tracking-[-0.015em] text-graphite md:text-[56px]">{start.title}</h2>
        <p className="mx-auto mt-3 max-w-[36rem] text-[17px] leading-[1.47] tracking-[-0.022em] text-steel md:text-[19px]">{start.text}</p>
      </div>

      <div className="mx-auto mt-10 max-w-[680px] rounded-[28px] bg-white p-6 md:p-10" data-fade style={{ ["--d" as string]: "100ms" }}>
        {state === "sent" ? (
          <div role="status" className="py-10 text-center">
            <p className="text-[32px] font-semibold tracking-[-0.02em] text-graphite">Thank you.</p>
            <p className="mt-2 text-[17px] text-steel">We will be in touch to set up a first conversation.</p>
          </div>
        ) : (
          <form onSubmit={submit} className="flex flex-col gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Your name"><input name="name" required autoComplete="name" className={input} /></Field>
              <Field label="Business name"><input name="business" required autoComplete="organization" className={input} /></Field>
              <Field label="Email"><input name="email" type="email" required autoComplete="email" className={input} /></Field>
              <Field label="Phone (optional)"><input name="phone" type="tel" autoComplete="tel" className={input} /></Field>
            </div>
            <Field label="About the project"><textarea name="message" required rows={4} className={input} placeholder="What you do, and what you want the site to change." /></Field>
            <button disabled={state === "sending"} className="mt-2 min-h-12 w-full rounded-full bg-red text-[17px] tracking-[-0.022em] text-white transition-colors hover:bg-red-deep disabled:opacity-60 sm:w-auto sm:self-center sm:px-10">
              {state === "sending" ? "Sending…" : "Start a project"}
            </button>
            {state === "failed" && (
              <p role="alert" className="text-center text-[14px] text-graphite">
                That did not send. Message us on{" "}
                <a href={socials[0].href} target="_blank" rel="noreferrer" className="text-red underline">Instagram @88eightmarketing</a> and we will pick it up there.
              </p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}

const input = "w-full rounded-[12px] border border-hair bg-white px-4 py-3 text-[17px] tracking-[-0.022em] text-graphite outline-none transition-[border-color,box-shadow] placeholder:text-steel-2 focus:border-[#0071e3] focus:shadow-[0_0_0_4px_rgba(0,113,227,.15)]";

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5 text-left">
      <span className="text-[12px] font-medium text-steel">{label}</span>
      {children}
    </label>
  );
}
