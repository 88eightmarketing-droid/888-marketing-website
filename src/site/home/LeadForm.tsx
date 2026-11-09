"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { form, socials } from "@/data/site";

/**
 * The proposal form, used in the hero and again at the close. Posts to
 * /api/contact (Resend). A failure is shown as a failure, never a false
 * success: the route logs `LOST ENQUIRY` with the whole submission, and the
 * visitor is pointed at Instagram.
 *
 * Real autocomplete tokens on purpose: this is the public lead form.
 * The business-name field reports what is typed (`onBusiness`) so the live
 * preview further down the page can show it.
 */
export default function LeadForm({ id, onBusiness, tone = "light" }: {
  id: string;
  onBusiness?: (name: string) => void;
  tone?: "light" | "dark";
}) {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "failed">("idle");

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    const f = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const payload = { name: f.name, business: f.business, email: f.email, phone: f.phone, message: `Needs: ${f.need || "Not sure yet"}${f.notes ? `\n\n${f.notes}` : ""}` };
    try {
      const r = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      setState(r.ok ? "sent" : "failed");
    } catch {
      setState("failed");
    }
  }

  const dark = tone === "dark";
  const field = `w-full rounded-[10px] border px-4 py-3.5 text-[16px] outline-none transition-[border-color,box-shadow] ${dark ? "border-white/15 bg-white/[0.06] text-white placeholder:text-white/40 focus:border-white/60" : "border-hair bg-white text-ink placeholder:text-steel/70 focus:border-ink focus:shadow-[0_0_0_4px_rgba(11,11,12,.08)]"}`;

  if (state === "sent") {
    return (
      <div role="status" className="py-8 text-center">
        <p className={`text-[30px] font-extrabold tracking-[-0.03em] ${dark ? "text-white" : "text-ink"}`}>Thank you.</p>
        <p className={`mt-2 text-[16px] ${dark ? "text-white/70" : "text-steel"}`}>We will be in touch to set up a first conversation.</p>
      </div>
    );
  }

  return (
    <form id={id} onSubmit={submit} className="flex flex-col gap-3">
      <Label text="Business name" dark={dark}>
        <input name="business" required autoComplete="organization" className={field} onChange={(e) => onBusiness?.(e.target.value)} />
      </Label>
      <div className="grid gap-3 sm:grid-cols-2">
        <Label text="Your name" dark={dark}><input name="name" required autoComplete="name" className={field} /></Label>
        <Label text="Phone (optional)" dark={dark}><input name="phone" type="tel" autoComplete="tel" className={field} /></Label>
      </div>
      <Label text="Email" dark={dark}><input name="email" type="email" required autoComplete="email" className={field} /></Label>
      <Label text="What do you need?" dark={dark}>
        <select name="need" defaultValue={form.needs[0]} className={`${field} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%236b6b70%22 stroke-width=%222%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-[length:18px] bg-[right_14px_center] bg-no-repeat pr-10`}>
          {form.needs.map((n) => <option key={n}>{n}</option>)}
        </select>
      </Label>
      <button disabled={state === "sending"} className="group mt-1 inline-flex min-h-[54px] items-center justify-center gap-3 rounded-[10px] bg-red px-6 text-[16px] font-bold tracking-[-0.01em] text-white transition-colors hover:bg-red-deep disabled:opacity-60">
        {state === "sending" ? "Sending…" : form.button}
        <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
      </button>
      <p className={`text-center text-[12.5px] leading-[1.45] ${dark ? "text-white/55" : "text-steel"}`}>{form.small}</p>
      {state === "failed" && (
        <p role="alert" className={`text-center text-[14px] ${dark ? "text-white" : "text-ink"}`}>
          That did not send. Message us on{" "}
          <a href={socials[0].href} target="_blank" rel="noreferrer" className="font-semibold underline">Instagram @88eightmarketing</a> and we will pick it up there.
        </p>
      )}
    </form>
  );
}

function Label({ text, dark, children }: { text: string; dark: boolean; children: ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5 text-left">
      <span className={`text-[12px] font-semibold tracking-[0.01em] ${dark ? "text-white/60" : "text-steel"}`}>{text}</span>
      {children}
    </label>
  );
}
